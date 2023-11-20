package com.ssafy.develog.company.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.dto.request.RequestCompany;
import com.ssafy.develog.company.dto.request.RequestCompanyDetail;
import com.ssafy.develog.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @JoinColumn(name = "company_info_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private CompanyInfo companyInfo;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String name;
    private String concept;
    private String vision;


    public static Company makeCompany(RequestCompany request, CompanyInfo companyInfo, User user){

        Company company = new Company();
        company.companyInfo = companyInfo;
        company.user = user;

        company.name = request.getName();
        company.concept = request.getConcept();
        company.vision = request.getVision();

        return company;
    }

    public void updateCompany(RequestCompanyDetail request){
        this.concept = request.getConcept();
        this.vision = request.getVision();
    }
    @Override
    public void updateTime() {
        super.updateTime();
    }
}
