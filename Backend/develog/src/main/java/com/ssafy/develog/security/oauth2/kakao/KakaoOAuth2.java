package com.ssafy.develog.security.oauth2.kakao;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Component
@Slf4j
public class KakaoOAuth2 {

    @Value("${oauth2.kakao.client-id}")
    String clientId;

    URI KAKAO_TOKEN_URL = URI.create("https://kauth.kakao.com/oauth/token");
    URI KAKAO_USER_URL = URI.create("https://kapi.kakao.com/v2/user/me");

    /**
     * 우리 서버가 카카오한테 인가코드를 주면 코드를 통해 AccessToken을 리턴하는 메서드
     * @param authorizedCode : 인가코드
     * @param redirectUri : 리다이렉트할 URI
     * @return : Access Token
     */
    private String getAccessToken(String authorizedCode, String redirectUri) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);
        // Http 요청 << 이게 oauth2-client 를 쓰면 알아서 되는 것으로 판단됨.
        ResponseEntity<String> response = rt.exchange(
                KAKAO_TOKEN_URL,
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
        // JSON -> 액세스 토큰 파싱
        String tokenJson = response.getBody();
        log.info("카카오에 Authorization Code를 보내서 AccessToken 들어있는 응닶값 받아왔음>>>  " + tokenJson);
        JSONObject json = new JSONObject(tokenJson);
        return json.getString("access_token");
    }

    /**
     * JSONObject 형태로 카카오에게서 필요한 정보들을 받아오는 메서드
     * @param accessToken
     * @return
     */
    private JSONObject requestUserInfoJsonObject(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기
        ResponseEntity<String> response = rt.exchange(
                KAKAO_USER_URL,
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        // 사용자 정보 json 객체 리턴
        return new JSONObject(response.getBody());
    }

    /**
     * 백에서 한번 더 Access Token을 통해 필요한 리소스를 요청하고 응답받는 메서드
     * @param accessToken : 카카오가 준 access-token
     * @return : 우리가 카카오에게서 필요한 리소스(이메일, 등등) > KakaoUserDto
     */
    private KakaoUserDto getUserByAccessToken(String accessToken) {

        //JsonObject 형태로 받아온다
        JSONObject body = requestUserInfoJsonObject(accessToken);
        log.info("카카오에 AccessToken을 보내서 우리가 원하는 사용자 리소스 받아왔음>>>  " + body);

        // 유저 정보 파싱
        JSONObject kakaoAccount = body.getJSONObject("kakao_account");

        return KakaoUserDto.builder()
                .socialId(Long.toString((Long) body.get("id")))
                .name((String) kakaoAccount.getJSONObject("profile").get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .build();
    }

    public KakaoUserDto getUserInfo(String authorizedCode, String redirectUri) {
        // 1. 인가코드 -> 액세스 토큰 (벨로그 기준 4,5번 과정)
        String accessToken = getAccessToken(authorizedCode, redirectUri);
        // 2. 액세스 토큰 -> 카카오 사용자 정보 (벨로그 기준 6,7번 과정)
        return getUserByAccessToken(accessToken);
    }



}
