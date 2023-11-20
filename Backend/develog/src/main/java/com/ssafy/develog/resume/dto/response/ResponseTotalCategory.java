package com.ssafy.develog.resume.dto.response;

import com.ssafy.develog.resume.domain.Category;
import com.ssafy.develog.resume.domain.UserCategory;
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
public class ResponseTotalCategory {
    
    private List<ResponseUserCategory> userCategory = new ArrayList<>();
    private List<ResponseCategory> category = new ArrayList<>();

    public static ResponseTotalCategory from(List<UserCategory> userCategories, List<Category> categories){

        ResponseTotalCategory response = new ResponseTotalCategory();

        response.userCategory = userCategories.stream()
                .filter(Objects::nonNull)
                .map(ResponseUserCategory::from).collect(Collectors.toList());

        response.category = categories.stream()
                .filter(Objects::nonNull)
                .map(ResponseCategory::from).collect(Collectors.toList());


        return response;
    }
    
}
