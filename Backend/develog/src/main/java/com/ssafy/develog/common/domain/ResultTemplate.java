package com.ssafy.develog.common.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResultTemplate<T> {
    private int status;
    private T data;
}
