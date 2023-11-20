package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    @Query("select distinct i from Interview i " +
            "left join fetch i.prediction p " +
            "left join p.tailList tl " +
            "where i.interviewId = :interviewId")
    Optional<Interview> findInterviewWithPredictionAndTails(@Param("interviewId") Long interviewId);
}
