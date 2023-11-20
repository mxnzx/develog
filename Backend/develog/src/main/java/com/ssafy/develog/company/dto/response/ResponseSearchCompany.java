package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.company.domain.CompanyInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSearchCompany {

    private String name;
    private Long companyInfoId;

    public static ResponseSearchCompany from(CompanyInfo companyInfo){

        ResponseSearchCompany response = new ResponseSearchCompany();
        response.name = companyInfo.getName();
        response.companyInfoId = companyInfo.getCompanyInfoId();

        return response;
    }
}
