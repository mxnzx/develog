package com.ssafy.develog.user.domain;

import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.domain.History;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Memo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memoId;

    @JoinColumn(name = "history_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private History history;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String content;
    private String title;

}
