package com.ssafy.develog.resume.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestUserCategory {

    private Long userId;
    private String keyword;

}
