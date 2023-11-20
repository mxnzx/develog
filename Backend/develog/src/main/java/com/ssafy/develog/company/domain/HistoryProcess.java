package com.ssafy.develog.company.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyProcessId;

    @JoinColumn(name = "history_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private History history;

    private String title;
    private String content;

}
