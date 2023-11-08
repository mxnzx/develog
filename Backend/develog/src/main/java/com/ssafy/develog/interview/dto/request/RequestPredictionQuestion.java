package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPredictionQuestion {

    // 이부분을 그냥 리스트로 들어오도록 수정하고,
    // /api/interview/openAI랑 합치면 될것같음
    private Long interviewId;
    private Long resumeDetailId;
    private List<String> questionContents;



}
