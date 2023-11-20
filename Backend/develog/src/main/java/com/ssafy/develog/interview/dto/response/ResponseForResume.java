package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.company.dto.response.ResponseCompany;
import com.ssafy.develog.resume.domain.ResumeDetail;
import com.ssafy.develog.resume.domain.ResumeDetailCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseForResume {
    private String questionContent;
    private String answerContent;
    private Long resumeDetailId;

    public static ResponseForResume from(ResumeDetail resumeDetail) {

        ResponseForResume response = new ResponseForResume();

        response.resumeDetailId = resumeDetail.getResumeDetailId();
        response.questionContent = resumeDetail.getQuestion();
        response.answerContent = resumeDetail.getAnswer();

        return response;
    }
}
