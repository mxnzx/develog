package com.ssafy.develog.resume.domain;


import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.interview.domain.Prediction;
import com.ssafy.develog.resume.dto.request.RequestResumeDetail;
import com.ssafy.develog.resume.dto.request.RequestResumeIdWithNum;
import com.ssafy.develog.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResumeDetail extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeDetailId;

    @JoinColumn(name = "resume_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Resume resume;

    private String question;
    private String answer;
    private int questionNum;
    private int maxLength;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "resumeDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResumeDetailCategory> resumeDetailCategoryList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "resumeDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prediction> predictions;


    public static ResumeDetail makeResumeDetail(Resume resume, RequestResumeIdWithNum request){

        ResumeDetail resumeDetail = new ResumeDetail();
        resume.updateTime();
        resumeDetail.resume = resume;
        resumeDetail.questionNum = request.getQuestionNum();
        resumeDetail.question = "";
        resumeDetail.answer = "";

        return resumeDetail;
    }


    public void updateResumeDetail(Resume resume, RequestResumeDetail detail, Category category, UserCategory userCategory){

        log.info(detail.getQuestion());
        log.info(detail.getAnswer());
        log.info(String.valueOf(detail.getQuestionNum()));
        log.info(String.valueOf(detail.getMaxLength()));

        this.resume = resume;
        this.question = detail.getQuestion();
        this.answer = detail.getAnswer();
        this.questionNum = detail.getQuestionNum();
        this.maxLength = detail.getMaxLength();
        this.resumeDetailCategoryList.add(ResumeDetailCategory.makeCategory(this, category, userCategory));
    }

    public void deleteResumeDetailCategory(){
        for (int i = 0; i < resumeDetailCategoryList.size(); i++) {
            resumeDetailCategoryList.remove(i);
            i--;
        }
    }

}
