package com.ssafy.develog.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
public class ResponseCareerDto {

    private String name;
    private String department;
    private String section;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
