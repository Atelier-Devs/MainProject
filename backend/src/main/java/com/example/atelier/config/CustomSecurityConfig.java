package com.example.atelier.config;

import com.example.atelier.security.APILoginFailHandler;
import com.example.atelier.security.APILoginSuccessHandler;
import com.example.atelier.security.CustomAccessDeniedHandler;
import com.example.atelier.security.JWTCheckFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity // 메서드 별 권한 체크
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("----security config----");

        // CORS 설정
        http.cors(httpSecurityCorsConfigurer ->
                httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource())
        );
        // 세션 사용하지 않음
        http.sessionManagement(sessionConfig ->
                sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
        // CSRF 비활성화
        http.csrf(csrf -> csrf.disable());
// [1] 폼 로그인 비활성화
        http.formLogin(form -> form.disable());
        http.authorizeHttpRequests(authorize -> authorize
                // 모든 OPTIONS 요청 허용
//                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // /api/atelier/signup의 POST 요청 허용
                .requestMatchers(HttpMethod.POST, "/api/atelier/register/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/atelier/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/atelier/logout").permitAll()
                .requestMatchers("/error").permitAll()
                // 그 외 모든 요청은 인증 필요
                .anyRequest().authenticated()
        );

        // 폼 로그인 설정 (로그인 URL, 성공/실패 핸들러)
        http.formLogin(config -> {
            config.loginPage("/api/atelier/login");
            config.loginProcessingUrl("/api/atelier/login"); // 추가: 실제 로그인 요청 처리 URL 지정
            config.usernameParameter("email");
            config.passwordParameter("password");
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailHandler());
        });


        // JWT 체크 필터 추가 (UsernamePasswordAuthenticationFilter 이전에 실행)
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        // 예외 처리
        http.exceptionHandling(exception ->
                exception.accessDeniedHandler(new CustomAccessDeniedHandler())
        );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 암호화 알고리즘
    }
}