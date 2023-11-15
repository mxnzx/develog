package com.ssafy.develog.company.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestCompany {

    private Long companyInfoId;
    private String name;
    private String concept;
    private String vision;

}
