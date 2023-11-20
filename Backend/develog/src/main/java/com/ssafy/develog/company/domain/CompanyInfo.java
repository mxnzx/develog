package com.ssafy.develog.company.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompanyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyInfoId;

    private String name;
    private String logoUrl;

    public static CompanyInfo makeCompanyInfo(String name) {

        CompanyInfo companyInfo = new CompanyInfo();
        companyInfo.name = name;

        return companyInfo;
    }


}
