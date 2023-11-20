package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.company.domain.History;
import lombok.Data;

@Data
public class ResponseMainResume {

    private Long resumeId;
    private Long companyId;
    private String name;
    private String section;
    private String chapter;
    private Long historyId;

    public static ResponseMainResume from(History mainResume) {

        if(mainResume.getResume() == null || mainResume.getCompany() == null) return null;

        ResponseMainResume response = new ResponseMainResume();
        response.historyId = mainResume.getHistoryId();
        response.resumeId = mainResume.getResume().getResumeId();
        response.companyId = mainResume.getCompany().getCompanyId();
        response.name = mainResume.getCompany().getName();
        response.section = mainResume.getSection();
        response.chapter = mainResume.getChapter();

        return response;
    }

}
