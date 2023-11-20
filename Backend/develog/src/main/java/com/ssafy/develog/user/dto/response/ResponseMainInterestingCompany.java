package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.company.domain.Company;
import lombok.Data;

@Data
public class ResponseMainInterestingCompany {

    private Long companyId;
    private String name;
    private String logoUrl;

    public static ResponseMainInterestingCompany from(Company company) {

        if(company == null) return null;

        ResponseMainInterestingCompany response = new ResponseMainInterestingCompany();

        response.companyId = company.getCompanyId();
        response.name = company.getName();
        response.logoUrl = (company.getCompanyInfo() == null) ? null : company.getCompanyInfo().getLogoUrl();

        return response;
    }
}
