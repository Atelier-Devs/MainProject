package com.example.atelier.security;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Log4j2
@Component
public class APILoginFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
       log.info("Login failed....."+exception);
        Gson gson = new Gson();
        String json = gson.toJson(Map.of("error", "ERROR_LOGIN"));
        response.setContentType("application/json");

        PrintWriter printWriter = response.getWriter();
        printWriter.print(json);
        printWriter.close();
    }
}
