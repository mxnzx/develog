package com.ssafy.develog.company.domain;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("select h from History h " +
            "left join fetch h.company c " +
            "left join fetch c.companyInfo " +
            "left join fetch h.resume r " +
            "left join fetch r.resumeDetails rd " +
            "where h.historyId = :historyId")
    Optional<History> findHistoryByHistoryId(@Param("historyId") Long historyId);

    @Query("select h from History h " +
            "where h.company.companyId = :companyId " +
            "order by h.updatedAt desc ")
    List<History> findHistoryByCompany(@Param("companyId") Long companyId);


    @Query("select h from History h " +
            "left join fetch h.company c " +
            "left join fetch c.companyInfo " +
            "where h.historyId = :historyId")
    Optional<History> findHistoryWithCompanyByHistory(@Param("historyId") Long historyId);

    @Query("select distinct h from History h " +
            "left join fetch h.company c " +
            "left join fetch h.resume r " +
            "left join fetch h.interview i " +
            "left join fetch i.prediction p " +
            "left join fetch c.companyInfo ci " +
            "where c.user.userId = :userId")
    List<History> findHistoryWithResumeAndInterviewAndCompanyInfoByUser(@Param("userId") Long userId);
}
