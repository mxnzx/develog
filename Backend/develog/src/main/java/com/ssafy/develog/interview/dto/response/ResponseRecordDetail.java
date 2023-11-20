package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.interview.domain.RecordDetail;
import com.ssafy.develog.interview.domain.RecordDetailKeyword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseRecordDetail {

    private Long predictionId;
    private Long tailId;
    private String questionContent;
    private String script;
    private List<String> containedKeywords = new ArrayList<>();
    private List<String> unContainedKeywords = new ArrayList<>();
    private int voiceSecond;
    private int score;

    public static ResponseRecordDetail from(RecordDetail recordDetail){

        ResponseRecordDetail response = new ResponseRecordDetail();
        response.predictionId = recordDetail.getPrediction() == null ? -1 : recordDetail.getPrediction().getPredictionId();
        response.tailId = recordDetail.getTail() == null ? -1 : recordDetail.getTail().getTailId();
        response.questionContent = recordDetail.getPrediction() == null ? recordDetail.getTail() == null ? "질문 없음"
                : recordDetail.getTail().getTailQuestion() : recordDetail.getPrediction().getQuestionContent();
        response.script = recordDetail.getScript();
        response.containedKeywords = recordDetail.getRecordDetailKeywordList().stream()
                .filter(recordDetailKeyword -> recordDetailKeyword.getIsContain().equals(BaseCheckType.T))
                .map(RecordDetailKeyword::getKeyword).collect(Collectors.toList());
        response.unContainedKeywords = recordDetail.getRecordDetailKeywordList().stream()
                .filter(recordDetailKeyword -> recordDetailKeyword.getIsContain().equals(BaseCheckType.F))
                .map(RecordDetailKeyword::getKeyword).collect(Collectors.toList());
        response.voiceSecond = recordDetail.getVoiceSecond();
        response.score = recordDetail.getScore();

        return response;
    }

}












