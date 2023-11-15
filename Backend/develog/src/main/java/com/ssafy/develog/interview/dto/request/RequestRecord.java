package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRecord {

    private Long interviewId;
    private List<Long> checkedPredictionId;
    private List<Long> checkedTailId;

}
