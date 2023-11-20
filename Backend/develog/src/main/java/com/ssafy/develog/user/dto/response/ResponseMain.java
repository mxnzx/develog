package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.domain.User;
import lombok.Data;

import java.util.List;

@Data
public class ResponseMain {

    private String userName;
    private String userEmail;
//    private String userProfileIamgeUrl;
    private List<ResponseMainInterestingCompany> mainInterestingCompany;
    private List<ResponseMainResume> mainResume;
    private List<ResponseMainInterview> mainInterview;

    public static ResponseMain from(User user, List<ResponseMainInterestingCompany> interestingCompanies, List<ResponseMainResume> resumes, List<ResponseMainInterview> interviews) {

        ResponseMain response = new ResponseMain();

        response.userName = user.getName();
        response.userEmail = user.getEmail();
//        response.userProfileIamgeUrl = user.
        response.mainInterestingCompany = interestingCompanies;
        response.mainResume = resumes;
        response.mainInterview = interviews;

        return response;
    }

}
