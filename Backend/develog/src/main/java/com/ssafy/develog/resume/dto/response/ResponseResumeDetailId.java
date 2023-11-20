package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeDetailId {

    private Long resumeDetailId;

    public static ResponseResumeDetailId from(ResumeDetail resumeDetail){

        ResponseResumeDetailId response = new ResponseResumeDetailId();
        response.resumeDetailId = resumeDetail.getResumeDetailId();

        return response;
    }

}
