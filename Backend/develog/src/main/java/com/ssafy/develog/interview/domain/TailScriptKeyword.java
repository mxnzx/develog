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


}
