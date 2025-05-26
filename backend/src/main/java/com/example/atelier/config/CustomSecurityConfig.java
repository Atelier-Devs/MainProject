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

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@Log4j2
public class CustomSecurityConfig {

    private final APILoginSuccessHandler apiLoginSuccessHandler;
    private final APILoginFailHandler apiLoginFailHandler;
    private final JWTCheckFilter jwtCheckFilter;
    private final CustomAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("----security config----");

        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.formLogin(form -> {
            form.loginProcessingUrl("/api/atelier/login");
            form.usernameParameter("email");
            form.passwordParameter("password");
            form.successHandler(new APILoginSuccessHandler());
            form.failureHandler(new APILoginFailHandler());
        });


        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/api/atelier/register", "/api/atelier/register/**").permitAll()                .requestMatchers(HttpMethod.POST, "/api/atelier/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/atelier/view/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/atelier/logout").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/upload/**").permitAll()
                .anyRequest().authenticated()
        );

        http.addFilterBefore(jwtCheckFilter, UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(ex -> ex.accessDeniedHandler(accessDeniedHandler));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:3001"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
