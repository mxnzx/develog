package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePredictionQuestion {

    private Long predictionId;
    private String questionContent;
    private String answerContent;
    private BaseCheckType isTail;
    private Long resumeDetailId;
    private List<ResponsePredictionKeyword> predictionKeywordList;
    private List<ResponseTailQuestion> tailQuestionList;
    
    public static ResponsePredictionQuestion from(Prediction prediction){

        ResponsePredictionQuestion response = new ResponsePredictionQuestion();
        response.predictionId = prediction.getPredictionId();
        response.questionContent = prediction.getQuestionContent();
        response.answerContent = prediction.getAnswerContent();
        response.predictionKeywordList = prediction.getScriptKeyword().stream()
                .map(ResponsePredictionKeyword::from)
                .collect(Collectors.toList());
        List<ResponseTailQuestion> findTails = prediction.getTailList().stream()
                .map(ResponseTailQuestion::from)
                .collect(Collectors.toList());
        response.isTail = findTails.isEmpty() ? BaseCheckType.F : BaseCheckType.T;
        response.tailQuestionList = findTails;
        response.resumeDetailId = prediction.getResumeDetail() == null ? null :prediction.getResumeDetail().getResumeDetailId();

        return response;
    }


}
