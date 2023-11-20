package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCategory {

    private Long categoryId;
    private String keyword;

    public static ResponseCategory from(Category category){

        ResponseCategory response = new ResponseCategory();
        response.categoryId = category.getCategoryId();
        response.keyword = category.getKeyword();

        return response;
    }
}
