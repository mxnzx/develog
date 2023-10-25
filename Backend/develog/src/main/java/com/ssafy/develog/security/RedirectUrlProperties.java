package com.ssafy.develog.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RedirectUrlProperties {

    public static String KAKAO_REDIRECT_URL;

    public RedirectUrlProperties(@Value("http://localhost:8080/login/oauth2/code/kakao") String kakaoRedirectUrl) {
        KAKAO_REDIRECT_URL = kakaoRedirectUrl;
    }
}
