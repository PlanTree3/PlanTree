package com.plantree.memberservice.global.config.webmvc;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://k9a302a.p.ssafy.io",
                        "http://k9a302a.p.ssafy.io")
                .allowedMethods("POST", "GET", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true)
                .exposedHeaders("Set-Cookie");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(jwtLoginMemberArgumentResolver());
    }

    @Bean
    HandlerMethodArgumentResolver jwtLoginMemberArgumentResolver() {
        return new JwtLoginMemberArgumentResolver();
    }
}
