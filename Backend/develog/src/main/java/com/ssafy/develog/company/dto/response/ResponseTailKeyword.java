package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.interview.domain.TailScriptKeyword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTailKeyword {

    private String keyword;

    public static ResponseTailKeyword from(TailScriptKeyword tailScriptKeyword){

        ResponseTailKeyword response = new ResponseTailKeyword();
        response.keyword = tailScriptKeyword.getKeyword();

        return response;
    }
}
