package com.ssafy.develog.user.dto;

import com.ssafy.develog.user.domain.SocialType;
import lombok.Data;

@Data
public class LoginDto {

    private Integer id;
    private String socialId;
    private SocialType socialType;
    private String nickname;
    private boolean firstLogin;
}
