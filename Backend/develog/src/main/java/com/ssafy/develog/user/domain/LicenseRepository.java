package com.ssafy.develog.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License, Long> {

    List<License> findByUserUserId(Long userId);


}
