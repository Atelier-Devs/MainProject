package com.example.atelier.security;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.util.JWTUtil; // JWTUtil이 올바르게 구현되어 있어야 합니다.
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
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Component
@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // 1. OPTIONS 요청은 항상 필터 대상에서 제외 (CORS Preflight)
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            log.info("shouldNotFilter: OPTIONS request, skipping JWT check. URI: {}", request.getRequestURI());
            return true;
        }

        String path = request.getRequestURI();
        log.info("shouldNotFilter: Checking URI for exclusion: {}", path);


        // 3. 로그아웃 경로는 JWT 검사 없이 항상 허용 (JWT가 만료되었거나 없을 수도 있음)
        if (path.equals("/api/atelier/logout")) {
            log.info("shouldNotFilter: Logout request, skipping JWT check. URI: {}", path);
            return true;
        }

        if (path.equals("/api/atelier/register")) {
            log.info("shouldNotFilter: register");
            return true;
        }

        if (path.equals("/api/atelier/login")) {
            log.info("shouldNotFilter: login");
            return true;
        }

        if (path.startsWith("/api/atelier/view")) {
            log.info("shouldNotFilter: Static image request, skipping JWT check.");
            return true;
        }

        // 그 외의 모든 요청은 필터 대상에 포함
        log.info("shouldNotFilter: URI '{}' is subject to JWT check.", path);
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        log.info("----- JWTCheckFilter: doFilterInternal started for URI: {} -----", request.getRequestURI());

        String authHeaderStr = request.getHeader("Authorization");
        log.info("Authorization Header: {}", authHeaderStr);

        try {
            // 1. Authorization 헤더 검증
            if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
                log.warn("JWTCheckFilter - No or invalid Authorization header.");
                // 토큰이 없거나 형식이 잘못된 경우, 401 UNAUTHORIZED 응답
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json; charset=UTF-8");
                PrintWriter printWriter = response.getWriter();
                Gson gson = new Gson();
                String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN", "message", "Authorization header is missing or malformed."));
                printWriter.print(msg);
                printWriter.close();
                return; // 응답을 보냈으므로 필터 체인 중단
            }

            String accessToken = authHeaderStr.substring(7).trim();
            if (accessToken.isEmpty()) {
                log.warn("JWTCheckFilter - Token is empty.");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json; charset=UTF-8");
                PrintWriter printWriter = response.getWriter();
                Gson gson = new Gson();
                String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN", "message", "JWT token is empty."));
                printWriter.print(msg);
                printWriter.close();
                return; // 응답을 보냈으므로 필터 체인 중단
            }

            // 2. JWT 토큰 유효성 검사 및 클레임 추출 (JWTUtil의 구현이 올바른지 다시 확인)
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims : {}", claims);

            // 3. 클레임에서 사용자 정보 추출 및 유효성 검증
            Integer userId = null;
            Object userIdClaim = claims.get("userId");
            if (userIdClaim instanceof Number) {
                userId = ((Number) userIdClaim).intValue();
            } else if (userIdClaim instanceof String) {
                userId = Integer.parseInt((String) userIdClaim);
            }
            if (userId == null) {
                throw new IllegalArgumentException("userId claim is missing or invalid.");
            }
            String email = (String) claims.get("email");
            String name = (String) claims.get("name"); // name, phone, password는 JWT에 포함되지 않을 수도 있음
            String phone = (String) claims.get("phone");
            String password = (String) claims.get("password"); // password는 JWT에 포함하지 않는 것이 보안상 좋습니다.

            if (email == null) {
                throw new IllegalArgumentException("Email claim is missing.");
            }

            // 역할(roleNames) 클레임 처리
            Object roleNamesClaim = claims.get("roleNames");
            List<String> roleNames;
            if (roleNamesClaim instanceof List) {
                roleNames = (List<String>) roleNamesClaim;
            } else if (roleNamesClaim instanceof String) { // 단일 역할이 String으로 올 경우
                roleNames = List.of((String) roleNamesClaim);
            } else {
                // 기타 예상치 못한 타입의 roleNamesClaim 처리
                throw new IllegalArgumentException("Invalid roleNames claim type: " + (roleNamesClaim != null ? roleNamesClaim.getClass().getName() : "null"));
            }

            if (roleNames.isEmpty()) {
                throw new IllegalArgumentException("Role(roleNames) is empty.");
            }

            // 역할 문자열을 User.Role Enum으로 변환
            User.Role role;
            try {
                // 첫 번째 역할만 사용하거나, 모든 역할을 처리하도록 로직 변경 필요
                role = User.Role.valueOf(roleNames.get(0).trim().toUpperCase(Locale.ROOT));
            } catch (IllegalArgumentException e) {
                log.error("Invalid role: {}", roleNames.get(0), e);
                throw new IllegalArgumentException("Invalid role provided in token.", e);
            }

            // UserDTO는 필요한 정보만 담도록 수정 (password, refundableAmount, totalSpent 등은 여기서 필요 없을 수 있음)
            UserDTO userDTO = new UserDTO(userId, null, email, name, phone, role, null); // 예시: null 대신 실제 필요한 정보 채우기

            log.info("👤 Authenticated user DTO: {}", userDTO);

            // 4. 권한 설정 및 SecurityContextHolder에 인증 정보 설정
            // JWT에 여러 역할이 있다면 SimpleGrantedAuthority를 여러 개 생성하여 List에 담습니다.
            List<GrantedAuthority> authorities = roleNames.stream()
                    .map(roleName -> new SimpleGrantedAuthority("ROLE_" + roleName.trim().toUpperCase(Locale.ROOT)))
                    .collect(java.util.stream.Collectors.toList());

            log.info("👤 Granted Authorities: {}", authorities);

            // UsernamePasswordAuthenticationToken의 credentials(두 번째 인자)는 보통 null로 설정
            // 인증이 완료되었으므로 비밀번호는 필요 없음. principal(첫 번째 인자)에 UserDTO를 직접 넣을 수도 있음.
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDTO, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            log.info("👤 AuthenticationToken set: {}", authenticationToken);

            // 5. 다음 필터로 진행
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT Check Error for URI {}: {}", request.getRequestURI(), e.getMessage(), e);

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN", "message", e.getMessage()));

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 응답
            response.setContentType("application/json; charset=UTF-8");
            PrintWriter printWriter = response.getWriter();
            printWriter.print(msg);
            printWriter.close();
            // 여기서 return 함으로써 filterChain.doFilter 호출을 막아 SecurityContextHolder에 null이 설정되는 것을 방지
            // 또한 다음 필터로 진행하지 않으므로 추가적인 ExceptionTranslationFilter 등의 동작을 막음.
        }
    }
}