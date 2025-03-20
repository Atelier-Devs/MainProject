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

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        log.info("----- JWTCheckFilter -----");

        String authHeaderStr = request.getHeader("Authorization");

        try {
            // "Bearer " 접두어 제거 후 토큰 검증
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims : " + claims);

            // 클레임에서 필요한 값 추출
            String email = (String) claims.get("email");
            String password = (String) claims.get("password");
            String phone = (String) claims.get("phone");
            String name = (String) claims.get("name");

            // roleNames 처리: 클레임이 List 또는 String 또는 User.Role 인 경우 처리
            Object roleNamesClaim = claims.get("roleNames");
            List<String> roleNames;
            if (roleNamesClaim instanceof List) {
                roleNames = (List<String>) roleNamesClaim;
            } else if (roleNamesClaim instanceof String) {
                roleNames = List.of((String) roleNamesClaim);
            } else if (roleNamesClaim instanceof User.Role) {
                roleNames = List.of(((User.Role) roleNamesClaim).name());
            } else {
                throw new IllegalArgumentException("Invalid roleNames claim type: " + roleNamesClaim);
            }

            roleNames.forEach(System.out::println);

            // roleNames에서 첫 번째 역할을 선택하여 User.Role enum으로 변환 (예: CUSTOMER, STAFF, ADMIN)
            User.Role role = null;
            if (!roleNames.isEmpty()) {
                try {
                    // 역할 문자열 앞뒤의 공백 제거 후 대문자로 변환하여 enum과 매칭
                    role = User.Role.valueOf(roleNames.get(0).trim().toUpperCase(Locale.ROOT));
                    System.out.println("100)role:" + role);
                } catch (IllegalArgumentException e) {
                    log.error("유효하지 않은 역할: " + roleNames.get(0));
                    throw e;
                }
            }

            // UserDTO 생성 (id, phone, createdAt는 JWT에 포함되지 않았으므로 null로 처리)
            UserDTO userDTO = new UserDTO(null, name, email, password, phone, role, null);

            log.info("----------");
            log.info(userDTO);
            // UserDTO의 역할을 기반으로 GrantedAuthority 생성 (ROLE_ 접두어 추가 권장)
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.name());
            List<GrantedAuthority> authorities = List.of(authority);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(email, password, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("JWT Check Error......");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.print(msg);
            printWriter.close();
        }
    }
}
