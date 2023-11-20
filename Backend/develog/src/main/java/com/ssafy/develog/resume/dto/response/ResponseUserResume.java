package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUserResume {

    private BaseCheckType isQuestion;
    private List<ResponseResumeDetail> responseResumeDetailList = new ArrayList<>();

    public static ResponseUserResume from(List<ResponseResumeDetail> resumeDetails){

        ResponseUserResume response = new ResponseUserResume();

        response.isQuestion = resumeDetails.isEmpty() ? BaseCheckType.F : BaseCheckType.T;
        response.responseResumeDetailList = resumeDetails;

        return response;
    }

}
