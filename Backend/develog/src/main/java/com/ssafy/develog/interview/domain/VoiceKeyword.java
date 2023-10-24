package com.ssafy.develog.interview.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoiceKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voiceKeywordId;

    @JoinColumn(name = "voice_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Voice voice;

    private String keyword;

}
