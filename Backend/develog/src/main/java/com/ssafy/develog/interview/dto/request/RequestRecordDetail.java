package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRecordDetail {

    private Long recordDetailId;
    private String script;
    private int voiceSecond;
    private List<String> containsKeyword;
    private List<String> unContainsKeyword;

}
