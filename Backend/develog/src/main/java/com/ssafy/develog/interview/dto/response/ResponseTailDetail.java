package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Tail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTailDetail {
    private Long tailId;
    private String tailQuestion;

    public static ResponseTailDetail from(Tail tail) {
        ResponseTailDetail response = new ResponseTailDetail();

        response.tailId = tail.getTailId();
        response.tailQuestion = tail.getTailQuestion();

        return response;
    }
}
