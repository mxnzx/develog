package com.ssafy.develog.user.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResponseLicenseDto {

    private String title;
    private String organization;
    private String serialNum;
    private LocalDateTime acquisitionDate;
    private LocalDateTime expireDate;
}
