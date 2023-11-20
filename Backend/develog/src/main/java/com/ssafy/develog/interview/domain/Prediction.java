package com.ssafy.develog.interview.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Prediction extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long predictionId;

    @JoinColumn(name = "interview_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Interview interview;

    @JoinColumn(name = "resume_detail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private ResumeDetail resumeDetail;

    private String questionContent;
    private String answerContent;

    @Enumerated(EnumType.STRING)
    private BaseCheckType fromResume;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "prediction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tail> tailList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "prediction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScriptKeyword> scriptKeyword;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "prediction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Voice> voice;

    public static Prediction makePrediction(Interview interview, ResumeDetail resumeDetail, String questionContent) {

        Prediction pPrediction = new Prediction();

        pPrediction.interview = interview;
        pPrediction.resumeDetail = resumeDetail;
        pPrediction.questionContent = questionContent;
        pPrediction.fromResume = BaseCheckType.T;

        return pPrediction;
    }

    public static Prediction makePredictionByUser(Interview interview, ResumeDetail resumeDetail, String questionContent) {

        Prediction pPrediction = new Prediction();

        pPrediction.interview = interview;
        pPrediction.resumeDetail = resumeDetail;
        pPrediction.questionContent = questionContent;
        pPrediction.fromResume = BaseCheckType.T;

        return pPrediction;
    }

    public static Prediction makeOnlyQuestionByUser(Interview interview, String questionContent) {

        Prediction pPrediction = new Prediction();

        pPrediction.interview = interview;
        pPrediction.questionContent = questionContent;
        pPrediction.fromResume = BaseCheckType.F;

        return pPrediction;
    }

    public void updateAnswer(String answerContent) {
        this.answerContent = answerContent;
    }

}
