package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.RecordDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseRecord {

    private Long recordId;
    private String scriptUrl;
    private List<ResponseRecordDetail> recordDetails;


    public static ResponseRecord from(RecordDetail recordDetail, List<ResponseRecordDetail> recordDetails){

        ResponseRecord response = new ResponseRecord();
        response.recordId = recordDetail.getRecord().getRecordId();
        response.scriptUrl = recordDetail.getRecord().getVideos().isEmpty() ? "경로 없음" : recordDetail.getRecord().getVideos().get(0).getScriptUrl();
        response.recordDetails = recordDetails;

        return response;
    }


}
