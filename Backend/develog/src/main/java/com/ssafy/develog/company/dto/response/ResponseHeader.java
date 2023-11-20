package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.company.domain.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseHeader {

    private String name;
    private BaseCheckType isLogo;
    private String logoUrl;
    private Long companyId;
    private String concept;
    private String vision;

    public static ResponseHeader from(Company company){

        ResponseHeader response = new ResponseHeader();
        response.name = company.getName();
        response.companyId = company.getCompanyId();
        response.concept = company.getConcept();
        response.vision = company.getVision();

        response.isLogo = company.getCompanyInfo() == null ? BaseCheckType.F : BaseCheckType.T;
        response.logoUrl = company.getCompanyInfo() == null ? "로고 없음" : company.getCompanyInfo().getLogoUrl();

        return response;
    }
}
