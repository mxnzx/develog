package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.company.domain.History;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseHistory {

    private String chapter;
    private String section;
    private LocalDateTime createdAt;
    private Long resumeId;
    private Long interviewId;
    private Long historyId;

    public static ResponseHistory from(History history){

        ResponseHistory response = new ResponseHistory();

        response.chapter = history.getChapter();
        response.section = history.getSection();
        response.createdAt = history.getCreatedAt();
        response.resumeId = history.getResume() == null ? -1 : history.getResume().getResumeId();
        response.interviewId = history.getInterview() == null ? -1 : history.getInterview().getInterviewId();
        response.historyId = history.getHistoryId();

        return response;
    }


}
