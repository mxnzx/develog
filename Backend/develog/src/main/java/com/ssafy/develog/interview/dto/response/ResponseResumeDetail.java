package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeDetail {
    private Long resumeDetailId;
    private String question;
    private String answer;

    public static ResponseResumeDetail from(ResumeDetail resumeDetail) {

        ResponseResumeDetail response = new ResponseResumeDetail();

        response.resumeDetailId = resumeDetail.getResumeDetailId();
        response.question = resumeDetail.getQuestion();
        response.answer = resumeDetail.getAnswer();

        return response;
    }
}
