package com.ssafy.develog.resume.dto.request;

import com.ssafy.develog.common.domain.BaseCheckType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestResumeDetail {

    private Long resumeDetailId;
    private String question;
    private String answer;
    private int questionNum;
    private int maxLength;
    private List<String> keywordList;

}
