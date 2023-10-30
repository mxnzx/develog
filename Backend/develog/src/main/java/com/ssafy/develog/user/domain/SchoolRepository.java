package com.ssafy.develog.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByUserUserId(Long userId);

}
