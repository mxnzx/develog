package com.ssafy.develog.interview.domain;


import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.resume.domain.ResumeDetail;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Record extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @JoinColumn(name = "interview_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Interview interview;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "record", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecordDetail> recordDetails;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "record", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Video> videos;


    public static Record makeRecord(Interview interview){

        Record record = new Record();
        record.interview = interview;

        return record;
    }

}
