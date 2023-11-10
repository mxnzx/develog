package com.ssafy.develog.interview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRecordResult {

    private Long recordId;
    private List<RequestRecordDetail> recordDetailResult;

}
