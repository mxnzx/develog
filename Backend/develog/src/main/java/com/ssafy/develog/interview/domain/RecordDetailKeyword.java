package com.ssafy.develog.interview.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordDetailKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordDetailKeywordId;

    @JoinColumn(name = "record_detail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private RecordDetail recordDetail;

    private String keyword;

    @Enumerated(EnumType.STRING)
    private BaseCheckType isContain;


    public static RecordDetailKeyword makeKeyword(RecordDetail recordDetail, String keyword, BaseCheckType baseCheckType){

        RecordDetailKeyword recordDetailKeyword = new RecordDetailKeyword();
        recordDetailKeyword.recordDetail = recordDetail;
        recordDetailKeyword.keyword = keyword;
        recordDetailKeyword.isContain = baseCheckType;

        return recordDetailKeyword;
    }
}
