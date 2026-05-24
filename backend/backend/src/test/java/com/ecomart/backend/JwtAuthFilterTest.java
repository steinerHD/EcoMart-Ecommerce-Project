package com.ecomart.backend;

import com.ecomart.backend.security.JwtAuthFilter;
import com.ecomart.backend.security.JwtUtil;
import com.ecomart.backend.security.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtAuthFilterTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private FilterChain filterChain;

    private JwtAuthFilter filter;

    @BeforeEach
    void setUp() {

        filter = new JwtAuthFilter(
                jwtUtil,
                userDetailsService
        );

        SecurityContextHolder.clearContext();
    }

    @Test
    void doFilterInternal_sinAuthorizationHeader() throws Exception {

        MockHttpServletRequest request =
                new MockHttpServletRequest();

        MockHttpServletResponse response =
                new MockHttpServletResponse();

        filter.doFilter(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilterInternal_conTokenValido() throws Exception {

        MockHttpServletRequest request =
                new MockHttpServletRequest();

        request.addHeader(
                "Authorization",
                "Bearer token123"
        );

        MockHttpServletResponse response =
                new MockHttpServletResponse();

        UserDetails user =
                new User(
                        "test@test.com",
                        "123",
                        java.util.List.of()
                );

        when(jwtUtil.extractEmail("token123"))
                .thenReturn("test@test.com");

        when(userDetailsService.loadUserByUsername(
                "test@test.com"
        )).thenReturn(user);

        when(jwtUtil.isTokenValid("token123", user))
                .thenReturn(true);

        filter.doFilter(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
    }
}