package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {

    @Query("select r from Record r " +
            "left join fetch r.interview ri " +
            "left join fetch ri.history rih " +
            "where rih.company.companyId = :companyId " +
            "order by r.createdAt desc ")
    List<Record> findRecordByCompany (@Param("companyId") Long companyId);

}
