package com.ssafy.develog.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EduRepository extends JpaRepository<Edu, Long> {

    List<Edu> findByUserUserId(Long userId);
}
