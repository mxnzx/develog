package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    @Query("select distinct p from Prediction p " +
            "left join fetch p.scriptKeyword sk " +
            "left join p.tailList t " +
            "left join p.voice v " +
            "where p.predictionId = :predictionId ")
    Optional<Prediction> findPredictionForQuestionPage(@Param("predictionId") Long predictionId);

    @Query("select distinct p from Prediction p " +
            "left join fetch p.tailList t " +
            "left join t.tailScriptKeywordList tsk " +
            "left join p.scriptKeyword sk " +
            "left join p.voice v " +
            "left join t.voice tv " +
            "where (p.predictionId = :predictionId " +
            "or t.tailId in (select tail.tailId from Tail tail where tail.prediction.predictionId = :predictionId)) " +
            "order by v.voiceId desc , tv.voiceId desc ")
    Optional<Prediction> findTailDetailsByPredictionId(@Param("predictionId") Long predictionId);

        @Query("select distinct p from Prediction p " +
            "left join fetch p.tailList pt " +
            "left join pt.tailScriptKeywordList " +
            "left join p.scriptKeyword " +
            "where p.interview.interviewId = :interviewId " +
            "order by p.predictionId")
        List<Prediction> findPredictionsByInterview(@Param("interviewId") Long interviewId);


}
