package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeSimilarDetail {

    private BaseCheckType isQuestion;
    private List<ResponseResumeDetail> resumeDetails;

    public static ResponseResumeSimilarDetail from(List<ResponseResumeDetail> responseResumeDetails){

        ResponseResumeSimilarDetail response = new ResponseResumeSimilarDetail();
        response.resumeDetails = responseResumeDetails;
        response.isQuestion = responseResumeDetails.isEmpty() ? BaseCheckType.F : BaseCheckType.T;

        return response;
    }
}
