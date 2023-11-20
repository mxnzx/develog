package com.ssafy.develog.company.domain;

import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.dto.request.RequestHistory;
import com.ssafy.develog.interview.domain.Interview;
import com.ssafy.develog.interview.domain.Tail;
import com.ssafy.develog.resume.domain.Resume;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @JoinColumn(name = "company_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @JoinColumn(name = "resume_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Resume resume;

    @JoinColumn(name = "interview_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Interview interview;

    private String section;
    private String chapter;

    public static History makeHistory(RequestHistory request, Company company){

        History history = new History();
        history.company = company;
        history.section = request.getSection();
        history.chapter = request.getChapter();
        company.updateTime();
        return history;
    }
    @Override
    public void updateTime() {
        super.updateTime();
        company.updateTime();
    }

    public void updateResume(Resume resume) {
        this.resume = resume;
    }

    public void updateInterview(Interview interview) {
        this.interview = interview;
    }
}
