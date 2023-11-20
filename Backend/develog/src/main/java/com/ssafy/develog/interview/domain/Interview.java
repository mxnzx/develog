package com.ssafy.develog.interview.domain;

import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.interview.dto.request.RequestPostingInterview;
import com.ssafy.develog.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Interview extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    private LocalDateTime interviewAt;
    private String place;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "interview", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<History> history = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "interview", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prediction> prediction;

    public static Interview makeInterview(History history, RequestPostingInterview request) {

        Interview pInterview = new Interview();

        pInterview.history.add(history);
        pInterview.interviewAt = request.getInterviewAt();
        pInterview.place = request.getPlace();


        return pInterview;
    }
}
