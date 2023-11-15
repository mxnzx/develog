package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResponseLanguageDto {

    private String title;
    private String organization;
    private String grade;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
