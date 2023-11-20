package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.UserCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUserCategory {

    private Long userCategoryId;
    private String keyword;

    public static ResponseUserCategory from(UserCategory userCategory){

        ResponseUserCategory response = new ResponseUserCategory();
        response.userCategoryId = userCategory.getUserCategoryId();
        response.keyword = userCategory.getKeyword();

        return response;
    }
}
