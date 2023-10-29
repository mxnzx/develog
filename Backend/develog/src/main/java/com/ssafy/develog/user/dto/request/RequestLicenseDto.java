package com.ssafy.develog.user.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestLicenseDto {
    
    private String title;
    private String organization;
    private String serialNum;
    private LocalDateTime acquisitionDate;
    private LocalDateTime expireDate;
}
