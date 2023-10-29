package com.ssafy.develog.user.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestEduDto {

    private String title;
    private String organization;
    private String period;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
