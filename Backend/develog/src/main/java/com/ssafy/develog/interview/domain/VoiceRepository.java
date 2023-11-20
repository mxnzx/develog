package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VoiceRepository extends JpaRepository<Voice, Long> {

    @Query("select v from Voice v " +
            "left join fetch v.prediction p " +
            "left join fetch v.tail " +
            "where v.voiceId = :voiceId ")
    Optional<Voice> findPredictionAndTailByVoiceId(@Param("voiceId") Long voiceId);


    @Query("select v from Voice v " +
            "left join fetch v.prediction vp " +
            "left join fetch v.tail " +
            "left join fetch vp.scriptKeyword " +
            "left join v.voiceKeywordList " +
            "where v.prediction.predictionId = :predictionId " +
            "or v.tail.tailId in (select t.tailId from Tail t where t.prediction.predictionId = :predictionId) " +
            "order by v.voiceId desc ")
    List<Voice> findTailDetailsByPrediction(@Param("predictionId") Long predictionId);

}
