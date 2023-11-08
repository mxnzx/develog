package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPostPredictionKeyword {

    private Long predictionId;
    private String keyword;
}
