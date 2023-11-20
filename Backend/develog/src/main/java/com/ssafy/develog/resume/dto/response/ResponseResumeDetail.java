package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.Category;
import com.ssafy.develog.resume.domain.ResumeDetail;
import com.ssafy.develog.resume.domain.ResumeDetailCategory;
import com.ssafy.develog.resume.domain.UserCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeDetail {

    private Long resumeDetailId;
    private String question;
    private String answer;
    private ResponseTotalCategory totalCategory;
    public static ResponseResumeDetail from(ResumeDetail request){

        ResponseResumeDetail response = new ResponseResumeDetail();

        response.resumeDetailId = request.getResumeDetailId();
        response.question = request.getQuestion();
        response.answer = request.getAnswer();

        List<UserCategory> userCategory = request.getResumeDetailCategoryList().stream()
                .map(ResumeDetailCategory::getUserCategory).collect(Collectors.toList());

        List<Category> category = request.getResumeDetailCategoryList().stream()
                .map(ResumeDetailCategory::getCategory).collect(Collectors.toList());

        response.totalCategory = ResponseTotalCategory.from(userCategory, category);

        return response;
    }


}

