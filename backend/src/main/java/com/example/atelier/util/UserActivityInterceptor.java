package com.example.atelier.util;

import com.example.atelier.domain.User;
import com.example.atelier.service.LogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class UserActivityInterceptor implements HandlerInterceptor {

    @Autowired
    private LogService logService;

    // 사용자가 요청을 보내면 Interceptor가 요청을 가로채고 해당 요청을 기록
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof User) {
            User user = (User) auth.getPrincipal();
            // 요청 메서드 + 경로를 조합하여 어떤 작업을 수행했는지 기록
            String action = request.getMethod() + " " + request.getRequestURI(); // 예: "POST /reservations/3"
            logService.saveLog(user, action);
        }
        return true;
    }
}