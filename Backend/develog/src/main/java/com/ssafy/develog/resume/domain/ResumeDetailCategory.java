package com.ssafy.develog.resume.domain;

import com.ssafy.develog.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResumeDetailCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeDetailCategoryId;

    @JoinColumn(name = "resume_detail_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private ResumeDetail resumeDetail;

    @JoinColumn(name = "user_category_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private UserCategory userCategory;

    @JoinColumn(name = "category_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    public static ResumeDetailCategory makeCategory(ResumeDetail resumeDetail, Category category, UserCategory userCategory){

        ResumeDetailCategory response = new ResumeDetailCategory();
        response.resumeDetail = resumeDetail;
        response.userCategory = userCategory;
        response.category = category;

        return response;
    }

}
