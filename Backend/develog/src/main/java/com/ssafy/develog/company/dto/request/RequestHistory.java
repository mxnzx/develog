package com.ssafy.develog.company.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestHistory {

    private Long companyId;
    private String section;
    private String chapter;

}
