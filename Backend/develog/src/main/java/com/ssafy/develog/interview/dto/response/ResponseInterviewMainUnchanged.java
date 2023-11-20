package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseInterviewMainUnchanged {
    private int totalResumeSize;
    private ResponseCompanyHeader companyResponse;
    private List<Long> resumeDetailIds;

    public static ResponseInterviewMainUnchanged from(History history) {

        ResponseInterviewMainUnchanged response = new ResponseInterviewMainUnchanged();

        response.companyResponse = ResponseCompanyHeader.from(history);

        if(history.getResume() != null){
            List<Long> list = history.getResume().getResumeDetails().stream()
                    .map(ResumeDetail::getResumeDetailId)
                    .collect(Collectors.toList());
            response.totalResumeSize = list.size();
            response.resumeDetailIds = list;
        }

        return response;
    }
}
