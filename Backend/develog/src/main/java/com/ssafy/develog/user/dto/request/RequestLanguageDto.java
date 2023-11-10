package com.ssafy.develog.user.dto.request;

import com.ssafy.develog.user.domain.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestLanguageDto {

    private String title;
    private String organization;
    private String grade;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
