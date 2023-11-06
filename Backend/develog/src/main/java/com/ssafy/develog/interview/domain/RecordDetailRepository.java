package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordDetailRepository extends JpaRepository<RecordDetail, Long> {


}
