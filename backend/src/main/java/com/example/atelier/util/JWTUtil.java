package com.example.atelier.util;

import com.example.atelier.domain.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Log4j2
public class JWTUtil {
    private static String key = "1234567890123456789012345678901234567890"; // 최소 256bit

    // 토큰 생성
    public static String generateToken(Map<String, Object> valueMap, int min) {
        SecretKey key = null;

        try {
            key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();
    }

    // 토큰 검증
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;

        try {
            SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
            claim = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (MalformedJwtException e) {
            throw new CustomJWTException("Malformed");
        } catch (ExpiredJwtException e) {
            throw new CustomJWTException("Expired");
        } catch (InvalidClaimException e){
            throw new CustomJWTException("Invalid");
        } catch (JwtException e){
            throw new CustomJWTException("JWT Error");
        } catch (Exception e) {
            throw new CustomJWTException("Error");
        }
        return claim;
    }

    // 로그인 성공 후 토큰 생성용 메서드
    public static String createToken(User user) {
        Map<String, Object> valueMap = new HashMap<>();
        valueMap.put("userId", user.getId());
        valueMap.put("email", user.getEmail());
        valueMap.put("name", user.getName());
        valueMap.put("phone", user.getPhone());
        valueMap.put("roleNames", user.getRoleNames().name()); // enum

        return generateToken(valueMap, 300); // 300분 유효
    }
}
