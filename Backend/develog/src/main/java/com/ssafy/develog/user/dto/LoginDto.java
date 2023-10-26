package com.ssafy.develog.user.dto;

import com.ssafy.develog.user.domain.SocialType;
import lombok.Builder;
import lombok.Data;

/**
 * 로그인 방식이 카카오말고도 여러개 있을 수 있기 때문에 ResponseLoginDto 전에 LoginDto를 두었다.
 * 소셜타입을 지정해 이들을 가지고 구분할 수 있다.
 */
@Data
@Builder
public class LoginDto {

    private Long userId;
    private String socialId;
    private SocialType socialType;
    private String nickname;

}
