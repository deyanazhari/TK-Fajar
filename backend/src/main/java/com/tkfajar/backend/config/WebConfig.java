package com.tkfajar.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Autowired
    private AdminSessionInterceptor adminSessionInterceptor;
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(java.util.List.of("http://localhost:3000", "http://127.0.0.1:3000"));
        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(java.util.List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        return configuration;
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*")
                .allowedHeaders("Authorization", "Content-Type", "Cache-Control", "Accept")
                .allowCredentials(true)
                .maxAge(3600L);
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminSessionInterceptor);
    }
}