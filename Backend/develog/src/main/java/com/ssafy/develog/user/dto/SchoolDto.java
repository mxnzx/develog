package com.ssafy.develog.user.dto;

import com.ssafy.develog.user.domain.School;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SchoolDto {

    private Long schoolId;
    private String schoolType;
    private String schoolName;
    private String major;
    private String grade;

    private LocalDateTime enterDate;
    private LocalDateTime graduateDate;

    private Integer totalNum;
    private Double totalGrade;
    private Double totalPoint;

    private Integer majorNum;
    private Double majorGrade;
    private Double majorPoint;

    public static SchoolDto from(School school) {

        SchoolDto schoolDto = new SchoolDto();

        schoolDto.schoolId = school.getSchoolId();
        schoolDto.schoolType = String.valueOf(school.getSchoolType());
        schoolDto.schoolName = school.getSchoolName();
        schoolDto.major = school.getMajor();
        schoolDto.grade = school.getGrade();
        schoolDto.enterDate = school.getEnterDate();
        schoolDto.graduateDate = school.getGraduateDate();
        schoolDto.totalNum = school.getTotalNum();
        schoolDto.totalGrade = school.getTotalGrade();
        schoolDto.totalPoint = school.getTotalPoint();
        schoolDto.majorNum = school.getMajorNum();
        schoolDto.majorGrade = school.getMajorGrade();
        schoolDto.majorPoint = school.getMajorPoint();

        return schoolDto;
    }
}
