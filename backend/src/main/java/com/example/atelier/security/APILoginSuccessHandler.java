package com.example.atelier.security;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.security.CustomUserDetails;
import com.example.atelier.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Component
@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("✅ 로그인 성공");

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        int userId = principal.getUserId();
        String email = principal.getUsername();

        log.info("👤 userId = {}", userId);

        // 권한 추출 (ROLE_ 제거)
        String roleStr = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_CUSTOMER")
                .replace("ROLE_", "");

        // DTO 생성 (비밀번호 및 민감 정보 제외)
        UserDTO dto = new UserDTO(
                userId,
                null, // name
                email,
                null, // password
                null, // phone
                User.Role.valueOf(roleStr.toUpperCase()),
                null  // createdAt
        );

        // ✅ Claims 생성 → JWT 발급
        Map<String, Object> claims = dto.getClaims();

        String accessToken = JWTUtil.generateToken(claims, 60 * 24);
        String refreshToken = JWTUtil.generateToken(claims, 60 * 24);

        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);

        // ✅ 응답 설정 및 반환
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        String json = gson.toJson(claims);

        PrintWriter writer = response.getWriter();
        writer.println(json);
        writer.flush();
        writer.close();

        log.info("✅ 응답 claims: {}", claims);
    }
}
