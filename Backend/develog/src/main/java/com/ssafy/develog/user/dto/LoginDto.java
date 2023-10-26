package com.ssafy.develog.user.dto;

import com.ssafy.develog.user.domain.SocialType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDto {

    private Long id;
    private String socialId;
    private SocialType socialType;
    private String nickname;

    //from 뭔지 몰겠따

}
