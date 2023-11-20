package com.ssafy.develog.company.domain;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.develog.company.domain.QCompany.company;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanyQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<Company> checkCompany(Long userId, Long companyInfoId, String name){

        QCompany company = QCompany.company;

        return Optional.ofNullable(queryFactory.selectFrom(company)
                .distinct()
                .where(
                        company.user.userId.eq(userId),
                        companyIdExist(companyInfoId, name)
                ).limit(1)
                .fetchOne());
    }


    private BooleanExpression companyIdExist(Long companyInfoId, String name) {
        return companyInfoId != -1 ? company.companyInfo.companyInfoId.eq(companyInfoId) : company.name.eq(name);
    }

}
