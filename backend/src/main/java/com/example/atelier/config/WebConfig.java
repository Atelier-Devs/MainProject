package com.example.atelier.config;

import com.example.atelier.util.UserActivityInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private UserActivityInterceptor userActivityInterceptor;

    // UserActivityInterceptor를 InterceptorRegistry에 등록하여 모든 요청을 감지하고 로그를 남길 수 있도록 설정
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userActivityInterceptor).addPathPatterns("/**"); // 모든 요청 감지
    }
}