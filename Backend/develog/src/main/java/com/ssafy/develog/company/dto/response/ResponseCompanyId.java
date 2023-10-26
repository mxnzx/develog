package com.ssafy.develog.company.dto.response;

import com.ssafy.develog.company.domain.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCompanyId {

    private Long companyId;

    public static ResponseCompanyId from(Company company){

        ResponseCompanyId response = new ResponseCompanyId();
        response.companyId = company.getCompanyId();

        return response;
    }
}
