package com.ssafy.develog.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResumeDetailRepository extends JpaRepository<ResumeDetail, Long> {

    @Query("select r from ResumeDetail r " +
            "left join fetch r.resumeDetailCategoryList cl " +
            "left join fetch cl.category " +
            "where r.resumeDetailId = :resumeDetailId")
    Optional<ResumeDetail> findDetailByResumeDetail(@Param("resumeDetailId") Long resumeDetailId);

    @Query("select r from ResumeDetail r " +
            "left join fetch r.predictions p " +
            "where r.resumeDetailId = :resumeDetailId")
    Optional<ResumeDetail> findResumeDetailWithPredictionByResumeDetail(@Param("resumeDetailId") Long resumeDetailId);

    @Query("select distinct rd from ResumeDetail rd " +
            "left join fetch rd.resumeDetailCategoryList rdc " +
            "left join fetch rdc.userCategory " +
            "left join fetch rdc.category " +
            "where rd.resume.resumeId = :resumeId " +
            "order by rd.questionNum ")
    List<ResumeDetail> findResumeDetailsByResume(@Param("resumeId") Long resumeId);

    @Query("select distinct rd from ResumeDetail rd " +
            "left join fetch rd.resumeDetailCategoryList rdc " +
            "left join fetch rdc.userCategory " +
            "left join fetch rdc.category " +
            "left join fetch rd.resume r " +
            "left join r.histories h " +
            "left join h.company c " +
            "where c.user.userId = :userId " +
            "order by rd.questionNum")
    List<ResumeDetail> findResumeDetailByKeyword(@Param("userId") Long userId);


    @Query("select distinct rd from ResumeDetail rd " +
            "left join fetch rd.resumeDetailCategoryList rdc " +
            "left join fetch rdc.userCategory " +
            "left join fetch rdc.category " +
            "where rd.resumeDetailId = :resumeDetailId ")
    Optional<ResumeDetail> findResumeDetailsByResumeDetail(@Param("resumeDetailId") Long resumeDetailId);
}
