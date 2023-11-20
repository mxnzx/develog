package com.ssafy.develog.interview.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TailScriptKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tailScriptKeywordId;

    @JoinColumn(name = "tail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tail tail;

    private String keyword;


    public static TailScriptKeyword makeTailScriptKeyword(Tail tail, String keyword) {

        TailScriptKeyword tailScriptKeyword = new TailScriptKeyword();

        tailScriptKeyword.tail = tail;
        tailScriptKeyword.keyword = keyword;

        return tailScriptKeyword;
    }
}
