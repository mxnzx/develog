package com.ssafy.develog.interview.domain;


import com.ssafy.develog.interview.dto.request.RequestRecordDetail;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordDetailId;

    @JoinColumn(name = "record_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Record record;

    @JoinColumn(name = "prediction_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Prediction prediction;

    @JoinColumn(name = "tail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tail tail;

    private String script;
    private int voiceSecond;
    private int score;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recordDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecordDetailKeyword> recordDetailKeywordList;






    public static RecordDetail makeRecordDetail(Record record, Prediction prediction, Tail tail){

        RecordDetail recordDetail = new RecordDetail();

        recordDetail.record = record;
        recordDetail.prediction = prediction;
        recordDetail.tail = tail;
        recordDetail.script = "";
        recordDetail.voiceSecond = -1;
        recordDetail.score = -1;

        return recordDetail;
    }

    public void updateRecordDetail(RequestRecordDetail request, int score){

        this.script = request.getScript();
        this.voiceSecond = request.getVoiceSecond();
        this.score = score;

        this.record.updateTime();
    }



}
