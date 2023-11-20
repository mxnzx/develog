package com.ssafy.develog.user.dto.request;


import com.ssafy.develog.user.domain.SchoolType;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Data
public class RequestSchoolDto {

    private String schoolName;
    private String major;
    private String grade;

    private LocalDateTime enterDate;
    private LocalDateTime graduateDate;

    private SchoolType schoolType;

    private Integer totalNum;
    private Double totalGrade;
    private Double totalPoint;

    private Integer majorNum;
    private Double majorGrade;
    private Double majorPoint;

}
