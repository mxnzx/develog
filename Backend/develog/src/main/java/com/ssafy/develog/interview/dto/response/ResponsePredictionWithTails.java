package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Interview;
import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePredictionWithTails {
    private Long predictionId;
    private String questionContent;
    List<ResponseTailDetail> tailList;

    public static List<ResponsePredictionWithTails> from(Interview interview) {

        List<ResponsePredictionWithTails> response = interview.getPrediction().stream()
                .map(prediction -> {
                    ResponsePredictionWithTails responsePredictionWithTails = new ResponsePredictionWithTails();
                    responsePredictionWithTails.predictionId = prediction.getPredictionId();
                    responsePredictionWithTails.questionContent = prediction.getQuestionContent();

                    responsePredictionWithTails.tailList = prediction.getTailList().stream()
                            .map(ResponseTailDetail::from)
                            .collect(Collectors.toList());

                    return responsePredictionWithTails;
                })
                .collect(Collectors.toList());

        return response;
    }
}
