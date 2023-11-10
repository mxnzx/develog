package com.ssafy.develog.user.dto.response;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ResponseLoginDto {

    private Long userId;
//    private String userEmail;
    private String name;
    private String AccessToken;
    private String RefreshToken;

}
