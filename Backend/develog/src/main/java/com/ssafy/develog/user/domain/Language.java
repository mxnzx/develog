package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestLanguageDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long languageId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;
    private String organization;
    private String grade;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Language(User user, String title, String organization, String grade, LocalDateTime startDate, LocalDateTime endDate) {
        this.user = user;
        this.title = title;
        this.organization = organization;
        this.grade = grade;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static Language makeLanguage(User user, RequestLanguageDto request) {

        Language response = new Language();

        response.user = user;
        response.title = request.getTitle();
        response.organization = request.getOrganization();
        response.grade = request.getGrade();
        response.startDate = request.getStartDate();
        response.endDate = request.getEndDate();

        return response;
    }
}
