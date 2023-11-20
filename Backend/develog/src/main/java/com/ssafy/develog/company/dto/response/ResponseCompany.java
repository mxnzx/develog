package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.company.domain.Company;
import com.ssafy.develog.company.domain.CompanyInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCompany {

    private Long companyId;
    private String logoUrl;
    private BaseCheckType isLogo;
    private String name;
    private LocalDateTime updatedAt;


    public static ResponseCompany from(Company company){

        ResponseCompany response = new ResponseCompany();
        response.companyId = company.getCompanyId();
        response.name = company.getName();
        response.updatedAt = company.getUpdatedAt();

        response.logoUrl = company.getCompanyInfo() == null ? "로고 없음" : company.getCompanyInfo().getLogoUrl();
        response.isLogo = company.getCompanyInfo() == null ? BaseCheckType.F : BaseCheckType.T;

        return response;
    }

}
