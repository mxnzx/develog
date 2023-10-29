package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResponseProjectDto {

    private String title;
    private String organization;
    private String award;
    private String description;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
