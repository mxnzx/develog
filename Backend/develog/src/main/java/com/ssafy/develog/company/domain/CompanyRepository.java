package com.ssafy.develog.company.domain;

import com.ssafy.develog.resume.domain.ResumeDetailCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {


    @Query("select distinct c from Company c " +
            "left join fetch c.companyInfo ci " +
            "left join fetch c.user " +
            "where c.user.userId = :userId " +
            "order by c.updatedAt desc ")
    List<Company> findCompanyByUser(@Param("userId") Long userId);

    @Query("select distinct c from Company c " +
            "where c.user.userId = :userId")
    List<Company> searchCompanyByUser(@Param("userId") Long userId);

    @Query("select distinct c from Company c " +
            "left join fetch c.companyInfo " +
            "where c.companyId = :companyId")
    Optional<Company> findHeaderByCompany(@Param("companyId") Long companyId);


}
