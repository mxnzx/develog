package com.ssafy.develog.resume.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResume {

    private Long resumeId;
    private int totalQuestionSize;
    private List<ResponseResumeTotalDetail> responseResumeTotalDetails;


    public static ResponseResume from(Long resumeId, int totalQuestionSize, List<ResponseResumeTotalDetail> details){

        ResponseResume response = new ResponseResume();
        response.resumeId = resumeId;
        response.totalQuestionSize = totalQuestionSize;
        response.responseResumeTotalDetails = details;

        return response;
    }

}
