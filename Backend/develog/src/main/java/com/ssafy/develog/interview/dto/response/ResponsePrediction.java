package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.interview.domain.ScriptKeyword;
import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePrediction {
    private Long predictionId;
    private String questionContent;
    private Long resumeDetailId;
    private BaseCheckType fromResume;

    public static List<ResponsePrediction> from(ResumeDetail resumeDetail) {

        List<ResponsePrediction> response = resumeDetail.getPredictions().stream()
                .map(prediction -> {
                    ResponsePrediction tmp = new ResponsePrediction();
                    tmp.predictionId = prediction.getPredictionId();
                    tmp.questionContent = prediction.getQuestionContent();
                    tmp.resumeDetailId = prediction.getResumeDetail().getResumeDetailId();
                    tmp.fromResume = prediction.getFromResume();
                    return tmp;
                })
                .collect(Collectors.toList());

        return response;
    }
}
