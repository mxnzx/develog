package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.Category;
import com.ssafy.develog.resume.domain.ResumeDetail;
import com.ssafy.develog.resume.domain.ResumeDetailCategory;
import com.ssafy.develog.resume.domain.UserCategory;
import com.ssafy.develog.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResumeTotalDetail {

    private Long resumeDetailId;
    private String question;
    private String answer;
    private ResponseTotalCategory totalCategory;
    private int maxLength;
    private int questionNum;

    public static ResponseResumeTotalDetail from(ResumeDetail request){

        ResponseResumeTotalDetail response = new ResponseResumeTotalDetail();

        List<UserCategory> userCategory = request.getResumeDetailCategoryList().stream()
                .map(ResumeDetailCategory::getUserCategory).collect(Collectors.toList());

        List<Category> category = request.getResumeDetailCategoryList().stream()
                .map(ResumeDetailCategory::getCategory).collect(Collectors.toList());

        response.totalCategory = ResponseTotalCategory.from(userCategory, category);
        response.resumeDetailId = request.getResumeDetailId();
        response.question = request.getQuestion();
        response.answer = request.getAnswer();
        response.maxLength = request.getMaxLength();
        response.questionNum = request.getQuestionNum();

        return response;
    }

}
