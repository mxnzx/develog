//package com.ssafy.develog.config;
//
//import org.springdoc.core.GroupedOpenApi;
//import org.springdoc.core.SpringDocUtils;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//
//
//@Configuration
//public class SwaggerConfig {
//
//    static {
//        SpringDocUtils.getConfig()
//                .addAnnotationsToIgnore(AuthenticationPrincipal.class);
//    }
//    @Bean
//    public GroupedOpenApi allApi() {
//        return GroupedOpenApi.builder()
//                .group("all")
//                .pathsToMatch("/**")
//                .build();
//    }
//    @Bean
//    public GroupedOpenApi interviewApi() {
//        return GroupedOpenApi.builder()
//                .group("interview")
//                .pathsToMatch("/api/interview/**")
//                .build();
//    }
//}