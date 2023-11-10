package com.ssafy.develog.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Long> {

    List<Language> findByUserUserId(Long userID);
}
