package com.ssafy.develog.user.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestCareerDto {

    private Long userId;
    private String name;
    private String department;
    private String section;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
