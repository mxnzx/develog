package com.ssafy.develog.interview.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoiceKeywordRepository extends JpaRepository<VoiceKeyword, Long> {

    @Query("select vk from VoiceKeyword vk " +
            "where vk.voice.voiceId = :voiceId")
    List<VoiceKeyword> findAllByVoiceId(@Param("voiceId") Long voiceId);
}
