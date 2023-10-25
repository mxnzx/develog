package com.ssafy.develog.interview.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long videoId;

    private String scriptUrl;

    @JoinColumn(name = "record_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Record record;


}
