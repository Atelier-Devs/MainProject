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
        log.info("loadUserByUsername: {}", email);

        // 이메일로 사용자 조회 (UserRepository에 findByEmail 메서드가 있다고 가정)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다. 이메일: " + email));

        // 단일 Role을 GrantedAuthority로 변환 (ROLE_ 접두어 추가 권장)
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRoleNames().name());
        List<GrantedAuthority> authorities = List.of(authority);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),     // username
                user.getPassword(),  // password
                authorities          // 권한 목록
        );
    }
}
