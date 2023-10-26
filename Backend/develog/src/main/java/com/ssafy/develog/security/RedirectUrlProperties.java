package com.ssafy.develog.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RedirectUrlProperties {

    public static String KAKAO_REDIRECT_URL;

    public RedirectUrlProperties(@Value("${REDIRECT_URL}") String kakaoRedirectUrl) {
        KAKAO_REDIRECT_URL = kakaoRedirectUrl;
    }
}
