package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTailQuestion {

    private Long tailId;
    private String tailQuestion;
    private String tailAnswer;
    private List<ResponseTailKeyword> tailKeywordList;

    public static ResponseTailQuestion from(Tail tail){

        ResponseTailQuestion response = new ResponseTailQuestion();
        response.tailId = tail.getTailId();
        response.tailQuestion = tail.getTailQuestion();
        response.tailAnswer = tail.getTailAnswer();
        response.tailKeywordList = tail.getTailScriptKeywordList().stream()
                .map(ResponseTailKeyword::from)
                .collect(Collectors.toList());

        return response;
    }

}
