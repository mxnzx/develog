package com.ssafy.develog.interview.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
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

    @Enumerated(EnumType.STRING)
    private BaseCheckType isContain;

    public static VoiceKeyword makeVoiceKeyword(String keyword, Voice voice, BaseCheckType baseCheckType) {

        VoiceKeyword pVoiceKeyword = new VoiceKeyword();

        pVoiceKeyword.voice = voice;
        pVoiceKeyword.keyword = keyword;
        pVoiceKeyword.isContain = baseCheckType;

        return pVoiceKeyword;
    }
}
