package com.example.atelier.security;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // OPTIONS 요청은 필터 대상에서 제외
        if (request.getMethod().equals("OPTIONS")) return true;

        String path = request.getRequestURI();
        log.info("check uri....." + path);

        // 아래 경로들은 필터에서 제외합니다.
        if (path.startsWith("/api/atelier/register")) return true; // 회원가입 경로 제외
        if (path.startsWith("/api/atelier/login")) return true;
        if (path.startsWith("/api/atelier/view/")) return true;
        if (path.startsWith("/api/atelier/item")) return true;


//        if (path.startsWith("/api/atelier/residence/a")) return true;

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        log.info("----- JWTCheckFilter -----");

        String uri = request.getRequestURI();
        String authHeaderStr = request.getHeader("Authorization");
        log.info("Authorization Header: {}", authHeaderStr);
        if (uri.equals("/api/atelier/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
                throw new IllegalArgumentException("Authorization 헤더가 없거나 형식이 올바르지 않습니다.");
            }

            // "Bearer " 접두어 제거 후 토큰 검증
            String accessToken = authHeaderStr.substring(7).trim();
            if (accessToken.isEmpty()) {
                throw new IllegalArgumentException("토큰이 비어있습니다.");
            }

            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims : " + claims);

            Integer userId = null;
            Object userIdClaim = claims.get("userId");
            if (userIdClaim instanceof Number) {
                userId = ((Number) userIdClaim).intValue();
            } else if (userIdClaim instanceof String) {
                userId = Integer.parseInt((String) userIdClaim);
            }
            if (userId == null) {
                throw new IllegalArgumentException("userId 클레임이 누락되었습니다.");
            }
            String email = (String) claims.get("email");
            String password = (String) claims.get("password");
            String phone = (String) claims.get("phone");
            String name = (String) claims.get("name");

            if (email == null) {
                throw new IllegalArgumentException("필수 클레임이 누락되었습니다.");
            }

            Object roleNamesClaim = claims.get("roleNames");
            List<String> roleNames;
            if (roleNamesClaim instanceof List) {
                roleNames = (List<String>) roleNamesClaim;
            } else if (roleNamesClaim instanceof String) {
                roleNames = List.of((String) roleNamesClaim);
            } else if (roleNamesClaim instanceof User.Role) {
                roleNames = List.of(((User.Role) roleNamesClaim).name());
            } else {
                throw new IllegalArgumentException("유효하지 않은 roleNames claim 타입: " + roleNamesClaim);
            }

            if (roleNames.isEmpty()) {
                throw new IllegalArgumentException("역할(roleNames)이 비어있습니다.");
            }

            User.Role role;
            try {
                role = User.Role.valueOf(roleNames.get(0).trim().toUpperCase(Locale.ROOT));
            } catch (IllegalArgumentException e) {
                log.error("유효하지 않은 역할: {}", roleNames.get(0));
                throw e;
            }

            UserDTO userDTO = new UserDTO(userId, null, email, null, null, role, null);

            log.info("👤 인증된 사용자 1): {}", userDTO);

            // 권한 설정
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.name());
            List<GrantedAuthority> authorities = List.of(authority);
            log.info("👤 authorities 2): {}", authorities);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(email, password, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            log.info("👤 authenticationToken 3): {}", authenticationToken);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("JWT Check Error");
            log.error("예외 메시지: {}", e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json; charset=UTF-8");
            PrintWriter printWriter = response.getWriter();
            printWriter.print(msg);
            printWriter.close();
        }
    }
}
