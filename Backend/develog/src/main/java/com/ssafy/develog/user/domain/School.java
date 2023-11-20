package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestSchoolDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schoolId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String schoolName;
    private String major;
    private String grade;

    private LocalDateTime enterDate;
    private LocalDateTime graduateDate;

    @Enumerated(EnumType.STRING)
    private SchoolType schoolType;

    private Integer totalNum;
    private Double totalGrade;
    private Double totalPoint;

    private Integer majorNum;
    private Double majorGrade;
    private Double majorPoint;

    public static School makeSchool(User user, RequestSchoolDto request) {

        School response = new School();
        response.user = user;
        response.schoolName = request.getSchoolName();
        response.major = request.getMajor();
        response.grade = request.getGrade();
        response.enterDate = request.getEnterDate();
        response.graduateDate = request.getGraduateDate();
        response.schoolType = request.getSchoolType();
        response.totalNum = request.getTotalNum();
        response.totalGrade = request.getTotalGrade();
        response.totalPoint = request.getTotalPoint();
        response.majorNum = request.getMajorNum();
        response.majorGrade = request.getMajorGrade();
        response.majorPoint = request.getMajorPoint();


        return response;

    }
}













