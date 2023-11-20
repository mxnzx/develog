package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.interview.domain.ScriptKeyword;
import com.ssafy.develog.interview.domain.Voice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePredictionWithKeywords {
    private Long predictionId;
    private String answerContent;
    private List<String> keywordList;
    private String voiceUrl;
    private List<ResponseTail> tailList;

    public static ResponsePredictionWithKeywords from(Prediction request) {

        ResponsePredictionWithKeywords response = new ResponsePredictionWithKeywords();

        response.predictionId = request.getPredictionId();
        response.answerContent = request.getAnswerContent();
        response.voiceUrl = request.getVoice().isEmpty() ? "녹음 파일 없음" : request.getVoice().get(0).getVoiceUrl();
        response.keywordList = request.getScriptKeyword().stream()
                .map(ScriptKeyword::getKeyword)
                .collect(Collectors.toList());
        response.tailList = request.getTailList().stream().distinct()
                .map(ResponseTail::from)
                .collect(Collectors.toList());

        return response;
    }
}
