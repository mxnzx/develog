package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.company.domain.History;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseHistoryWithCompany {

    private String name;
    private BaseCheckType isLogo;
    private Long companyId;
    private String concept;
    private String vision;
    private LocalDateTime updatedAt;
    private String chapter;
    private String section;

    public static ResponseHistoryWithCompany from(History history){

        ResponseHistoryWithCompany response = new ResponseHistoryWithCompany();
        response.name = history.getCompany().getName();
        response.isLogo = history.getCompany().getCompanyInfo() != null ? BaseCheckType.T : BaseCheckType.F;
        response.companyId = history.getCompany().getCompanyId();
        response.concept = history.getCompany().getConcept();
        response.vision = history.getCompany().getVision();
        response.updatedAt = history.getUpdatedAt();
        response.chapter = history.getChapter();
        response.section = history.getSection();

        return response;
    }
}
