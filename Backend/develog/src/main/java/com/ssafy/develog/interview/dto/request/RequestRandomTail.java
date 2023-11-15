package com.ssafy.develog.interview.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRandomTail {

    private Long predictionId;
    @JsonProperty("questionText")
    private String tailQuestion;

}
