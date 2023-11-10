package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.company.domain.History;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseHistoryId {

    private Long historyId;

    public static ResponseHistoryId from(History history){

        ResponseHistoryId response = new ResponseHistoryId();

        response.historyId = history.getHistoryId();
        return response;
    }
}
