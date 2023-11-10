package com.ssafy.develog.resume.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestResumeIdWithNum {

    private Long resumeId;
    private int questionNum;
}
