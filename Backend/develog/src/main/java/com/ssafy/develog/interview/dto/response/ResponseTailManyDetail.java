package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTailManyDetail {
    private Long tailId;
    private String tailQuestion;
    private String tailAnswer;
    private String voiceUrl;
    private List<String> keywordList;

    public static List<ResponseTailManyDetail> from(List<Tail> tailList) {

        ArrayList<ResponseTailManyDetail> list = new ArrayList<>();

        for (Tail tail : tailList) {
            ResponseTailManyDetail tmpTail = new ResponseTailManyDetail();

            tmpTail.tailId = tail.getTailId();
            tmpTail.tailQuestion = tail.getTailQuestion();
            tmpTail.tailAnswer = tail.getTailAnswer();

        }
        return list;
    }
}
