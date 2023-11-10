package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.Resume;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeId {

    private Long resumeId;

    public static ResponseResumeId from(Resume resume){

        ResponseResumeId response = new ResponseResumeId();
        response.resumeId = resume.getResumeId();

        return response;
    }
}
