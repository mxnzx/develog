package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.domain.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseUserInfoDto {

    private String name;
    private String email;
    private LocalDateTime createdAt;

    public static ResponseUserInfoDto from(User user) {

        ResponseUserInfoDto response = new ResponseUserInfoDto();

        response.name = user.getName();
        response.email = user.getEmail();
        response.createdAt = user.getCreatedAt();

        return response;
    }

}
