package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.domain.User;
import lombok.Builder;
import lombok.Data;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@Builder
public class ResponseEduDto {

    private String title;
    private String organization;
    private String period;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
