package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPredictionQuestionByUser {
    private Long interviewId;
    private Long resumeDetailId;
    private String questionContent;
}
