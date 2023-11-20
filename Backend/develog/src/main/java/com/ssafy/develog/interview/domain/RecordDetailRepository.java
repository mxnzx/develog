package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecordDetailRepository extends JpaRepository<RecordDetail, Long> {


    @Query("select rd from RecordDetail rd " +
            "left join fetch rd.prediction " +
            "left join fetch rd.tail " +
            "where rd.recordDetailId = :recordDetailId")
    Optional<RecordDetail> findRecordDetailByRecordDetail(@Param("recordDetailId") Long recordDetailId);

    @Query("select distinct rd from RecordDetail rd " +
            "left join fetch rd.record r " +
            "left join fetch r.videos " +
            "left join rd.recordDetailKeywordList " +
            "where rd.record.recordId = :recordId " +
            "order by rd.recordDetailId ")
    List<RecordDetail> findRecordDetailsByRecord(@Param("recordId") Long recordId);

}
