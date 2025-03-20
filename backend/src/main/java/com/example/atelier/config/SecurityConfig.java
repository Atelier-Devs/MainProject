//package com.example.atelier.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())  // CSRF 보호 비활성화
//                .cors(cors -> cors.disable())  // CORS 비활성화
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().permitAll() // 모든 요청 인증 없이 허용
//                )
//                .sessionManagement(session -> session.disable()) // 세션 관리 비활성화
//                .securityContext(context -> context.disable()) // SecurityContext 사용 안함
//                .formLogin(form -> form.disable())  // 로그인 비활성화
//                .httpBasic(httpBasic -> httpBasic.disable());  // HTTP 기본 인증 비활성화
//
//        return http.build();
//    }
//}