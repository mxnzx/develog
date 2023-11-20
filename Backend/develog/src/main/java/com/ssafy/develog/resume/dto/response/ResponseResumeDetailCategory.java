package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.ResumeDetailCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeDetailCategory {

    public String keyword;

    public static ResponseResumeDetailCategory from(ResumeDetailCategory resumeDetailCategory){

        ResponseResumeDetailCategory response = new ResponseResumeDetailCategory();
        response.keyword =
                resumeDetailCategory.getUserCategory() == null ?
                        resumeDetailCategory.getCategory() == null ? "-1" : resumeDetailCategory.getCategory().getKeyword() :
                        resumeDetailCategory.getUserCategory().getKeyword();

        return response;
    }
}
