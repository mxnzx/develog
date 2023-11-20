package com.ssafy.develog.interview.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.interview.dto.request.RequestRandomTail;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tail extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tailId;

    private String tailQuestion;

    @JoinColumn(name = "prediction_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Prediction prediction;

    private String tailAnswer;

    @Enumerated(EnumType.STRING)
    private BaseCheckType isUse;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TailScriptKeyword> tailScriptKeywordList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Voice> voice;

    public static Tail makeTail(Prediction prediction) {

        Tail tail = new Tail();

        tail.prediction = prediction;
        tail.isUse = BaseCheckType.T;

        return tail;
    }

    public static Tail makeRandomTail(Prediction prediction, RequestRandomTail request){

        Tail tail = new Tail();

        tail.prediction = prediction;
        tail.tailQuestion = request.getTailQuestion();
        tail.tailAnswer = "";
        tail.isUse = BaseCheckType.T;

        return tail;
    }


    public void updateTailTitle(String tailTitle) {

        this.tailQuestion = tailTitle;
    }

    public void updateTailAnswer(String tailAnswer) {

        this.tailAnswer = tailAnswer;
    }
}
