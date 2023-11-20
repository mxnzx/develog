package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Record;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseRecordId {

    private Long recordId;
    private LocalDateTime createdAt;

    public static ResponseRecordId from(Record record){

        ResponseRecordId response = new ResponseRecordId();
        response.recordId = record.getRecordId();
        response.createdAt = record.getCreatedAt();

        return response;
    }
}
