package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.interview.domain.ScriptKeyword;
import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class ResponsePredictionPage {
    private ResponseForResume resumeDetail;
    private String voiceUrl;
    private String predictionQuestion;
    private String predictionAnswer;
    private boolean isTail;
    private List<KeywordIdAndKeyword> keywords;
    private List<ResponseTailDetail> tailListResponse;

    public static ResponsePredictionPage from(ResponseForResume responseForResume, Prediction prediction) {

        ResponsePredictionPage response = new ResponsePredictionPage();

        response.resumeDetail = responseForResume;

        response.predictionQuestion = prediction.getQuestionContent();
        response.predictionAnswer = prediction.getAnswerContent();
        response.isTail = !prediction.getTailList().isEmpty();

        log.info("키워드 몇개오냐::?? " + prediction.getScriptKeyword().size());

        List<KeywordIdAndKeyword> tmpKeywordList = prediction.getScriptKeyword().stream()
                .map(KeywordIdAndKeyword::from)
                .collect(Collectors.toList());

        List<ResponseTailDetail> tmpTailList = prediction.getTailList().stream()
                .map(ResponseTailDetail::from)
                .collect(Collectors.toList());

        response.keywords = tmpKeywordList;
        response.tailListResponse = tmpTailList;

        if(!prediction.getVoice().isEmpty()){
            response.voiceUrl = prediction.getVoice().get(0).getVoiceUrl();
        }

        return response;
    }

    @Data
    private static class KeywordIdAndKeyword {
        private Long keywordId;
        private String keywordContent;

        public static KeywordIdAndKeyword from(ScriptKeyword scriptKeyword) {

            KeywordIdAndKeyword keyword = new KeywordIdAndKeyword();

            keyword.keywordId = scriptKeyword.getScriptKeywordId();
            keyword.keywordContent = scriptKeyword.getKeyword();

            return keyword;
        }
    }
}
