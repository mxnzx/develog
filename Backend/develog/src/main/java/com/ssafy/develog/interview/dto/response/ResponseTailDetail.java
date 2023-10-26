package com.ssafy.develog.interview.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTailDetail {
    private Long tailId;
    private String tailQuestion;
}
