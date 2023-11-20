package com.ssafy.develog.company.dto.response;


import com.ssafy.develog.interview.domain.ScriptKeyword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePredictionKeyword {

    private String keyword;

    public static ResponsePredictionKeyword from(ScriptKeyword scriptKeyword){

        ResponsePredictionKeyword response = new ResponsePredictionKeyword();
        response.keyword = scriptKeyword.getKeyword();

        return response;
    }
}
