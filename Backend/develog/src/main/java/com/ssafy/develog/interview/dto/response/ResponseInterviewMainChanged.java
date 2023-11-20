package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseInterviewMainChanged {
    private ResponseResumeDetail resumeDetail;
    private List<ResponsePrediction> predictionResponses;

    public static ResponseInterviewMainChanged from(ResumeDetail resumeDetail) {

        ResponseInterviewMainChanged response = new ResponseInterviewMainChanged();

        response.resumeDetail = ResponseResumeDetail.from(resumeDetail);
        response.predictionResponses = ResponsePrediction.from(resumeDetail);

        return response;
    }
}
