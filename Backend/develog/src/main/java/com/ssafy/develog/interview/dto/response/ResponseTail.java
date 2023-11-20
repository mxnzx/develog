package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.ScriptKeyword;
import com.ssafy.develog.interview.domain.Tail;
import com.ssafy.develog.interview.domain.TailScriptKeyword;
import com.ssafy.develog.interview.domain.Voice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTail {

    private Long tailId;
    private String tailQuestion;
    private String tailAnswer;
    private String voiceUrl;
    private List<String> keywordList;

    public static ResponseTail from(Tail request){

        ResponseTail response = new ResponseTail();

        response.tailId = request.getTailId();
        response.tailQuestion = request.getTailQuestion();
        response.tailAnswer = request.getTailAnswer();
        response.voiceUrl = request.getVoice().isEmpty() ? "녹음 파일 없음" : request.getVoice().get(0).getVoiceUrl();
        response.keywordList = request.getTailScriptKeywordList().stream()
                .map(TailScriptKeyword::getKeyword)
                .collect(Collectors.toList());

        return response;
    }
}
