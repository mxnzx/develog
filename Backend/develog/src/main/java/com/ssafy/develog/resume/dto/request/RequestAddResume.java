package com.ssafy.develog.resume.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestAddResume {

    private Long historyId;
    private LocalDateTime deadlineAt;
}
