package com.example.atelier.security;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("-----Success-----");
        log.info(authentication);
        log.info("-----------------");

        // 기본적으로 Spring Security는 org.springframework.security.core.userdetails.User를 반환함
        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        String email = principal.getUsername();
        String encodedPassword = principal.getPassword();
        int userId = principal.getUserId();
        log.info("principal.getUserId() = {}", userId); // 확인
        // 권한 추출: 예를 들어, 첫 번째 권한에서 "ROLE_" 접두어를 제거
        String authority = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_CUSTOMER");
//                .getAuthority();
        String roleStr = authority.startsWith("ROLE_") ? authority.substring(5) : authority;

        // 새 UserDTO를 생성 (이름, 전화번호, createdAt 등은 필요에 따라 null 처리)
        UserDTO dto = new UserDTO(userId, null, email, encodedPassword, null, User.Role.valueOf(roleStr.toUpperCase()), null);
        // getClaims()는 dto에 설정된 값을 기반으로 map을 만듭니다.
        Map<String, Object> claims = dto.getClaims();

        // 토큰 생성 (예: access token 10분, refresh token 24시간)
        String accessToken = JWTUtil.generateToken(claims, 540); // 540분(9시간)
        String refreshToken = JWTUtil.generateToken(claims, 60 * 24); // 24시간
        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);

        Gson gson = new Gson();
        String json = gson.toJson(claims);
        response.setContentType("application/json; charset=utf-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(json);
        printWriter.close();
        log.info("userId from principal: {}", userId);
        log.info("claims before token: {}", claims);
    }
}
