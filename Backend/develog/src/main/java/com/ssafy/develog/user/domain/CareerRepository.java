package com.ssafy.develog.user.domain;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CareerRepository extends JpaRepository<Career, Long> {

    List<Career> findByUserUserId(Long userId);
}
