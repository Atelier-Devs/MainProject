package com.example.atelier.security;

import com.example.atelier.domain.User;
import com.example.atelier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("이메일 없음"));

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRoleNames().name());
        List<GrantedAuthority> authorities = List.of(authority);

        // 반드시 커스텀 클래스 사용해야 함!
        return new CustomUserDetails(user, authorities);
    }
}
