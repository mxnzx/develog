package com.ssafy.develog.security.oauth2.kakao;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoUserDto {

    private String socialId;
    private String email;
    private String name;


}
