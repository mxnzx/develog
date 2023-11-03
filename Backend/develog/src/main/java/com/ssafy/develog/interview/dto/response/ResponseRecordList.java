package com.ssafy.develog.interview.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseRecordList {

    private List<ResponseRecordResult> responseRecordResults;

    public static ResponseRecordList from() {

        ResponseRecordList responseRecordList = new ResponseRecordList();

        return responseRecordList;
    }

}
