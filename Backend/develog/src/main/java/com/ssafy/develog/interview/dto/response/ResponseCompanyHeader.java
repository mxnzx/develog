package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.company.domain.History;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCompanyHeader {
    private String name;
    private BaseCheckType isLogo;
    private String logoUrl;
    private Long companyId;
    private String concept;
    private String vision;
    private String section;
    private String chapter;

    public static ResponseCompanyHeader from(History history) {

        ResponseCompanyHeader response = new ResponseCompanyHeader();

        response.name = history.getCompany().getName();
        response.isLogo = history.getCompany().getCompanyInfo() == null ? BaseCheckType.F : BaseCheckType.T;
        response.logoUrl = history.getCompany().getCompanyInfo() == null ? "로고 없음" : history.getCompany().getCompanyInfo().getLogoUrl();
        response.companyId = history.getCompany().getCompanyId();
        response.concept = history.getCompany().getConcept();
        response.vision = history.getCompany().getVision();
        response.section = history.getSection();
        response.chapter = history.getChapter();

        return response;
    }
}
