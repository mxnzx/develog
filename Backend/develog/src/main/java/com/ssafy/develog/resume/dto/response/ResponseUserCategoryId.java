package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.UserCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUserCategoryId {

    private Long userCategoryId;

    public static ResponseUserCategoryId from(UserCategory userCategory){

        ResponseUserCategoryId response = new ResponseUserCategoryId();
        response.userCategoryId = userCategory.getUserCategoryId();

        return response;
    }
}
