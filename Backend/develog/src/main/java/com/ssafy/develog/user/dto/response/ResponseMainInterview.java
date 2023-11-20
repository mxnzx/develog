package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.interview.domain.Prediction;
import lombok.Data;


@Data
public class ResponseMainInterview {

    private Long interviewId;
    private Long predictionId;
    private String questionContent;
    private Long companyId;
    private String name;
    private String chapter;
    private Long resumeDetailId;

    public static ResponseMainInterview from(History history, Prediction prediction) {

        if(history.getInterview() == null || history.getCompany() == null) return null;

        ResponseMainInterview response = new ResponseMainInterview();

        response.interviewId = history.getInterview().getInterviewId();
        response.predictionId = prediction.getPredictionId();
        response.questionContent = prediction.getQuestionContent();
        response.companyId = history.getCompany().getCompanyId();
        response.name = history.getCompany().getName();
        response.chapter = history.getChapter();
        response.resumeDetailId = prediction.getResumeDetail() == null ? null : prediction.getResumeDetail().getResumeDetailId();

        return response;
    }


}
