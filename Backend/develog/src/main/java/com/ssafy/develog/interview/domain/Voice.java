package com.ssafy.develog.interview.domain;


import com.ssafy.develog.interview.dto.request.RequestVoiceAnalysis;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Voice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voiceId;

    private String voiceUrl;

    @JoinColumn(name = "prediction_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Prediction prediction;

    @JoinColumn(name = "tail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tail tail;

    private String voiceText;
    private int similarity;
    private int voiceSecond;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "voice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VoiceKeyword> voiceKeywordList;

    public static Voice makeVoiceByPrediction(Prediction prediction, String fileName) {

        Voice pVoice = new Voice();

        pVoice.voiceUrl = fileName;
        pVoice.prediction = prediction;

        return pVoice;
    }

    public static Voice makeVoiceByTail(Tail tail, String fileName) {

        Voice pVoice = new Voice();

        pVoice.voiceUrl = fileName;
        pVoice.tail = tail;

        return pVoice;
    }

    public void updateVoiceUrl(String fileName) {

        this.voiceUrl = fileName;
    }

    public void updateAnalysis(int similarity, RequestVoiceAnalysis request) {

        this.similarity = similarity;
        this.voiceText = request.getVoiceText();
        this.voiceSecond = request.getVoiceSecond();

    }
}
