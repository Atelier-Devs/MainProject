package com.example.atelier.util;

import com.example.atelier.domain.User;
import com.example.atelier.service.LogService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class UserActivityAspect {

    @Autowired
    private LogService logService;

    // 서비스 레이어에서 실행되는 모든 서비스 메서드 감지
    @Pointcut("execution(* com.example.atelier.service.*.*(..))")
    public void serviceMethods() {}

    @Around("serviceMethods()")
    public Object logUserAction(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result;
        long start = System.currentTimeMillis();

        try {
            result = joinPoint.proceed(); // 원래 메서드 실행
        } finally {
            long executionTime = System.currentTimeMillis() - start;
            String methodName = joinPoint.getSignature().toShortString();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof User) {
                User user = (User) auth.getPrincipal();
                String action = methodName + " executed in " + executionTime + "ms";
                logService.saveLog(user, action); // 해당 사용자의 작업을 자동 기록
            }
        }
        return result;
    }
}