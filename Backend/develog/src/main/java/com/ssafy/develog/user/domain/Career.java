package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestCareerDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long careerId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String name;
    private String department;
    private String section;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Career(User user, String name, String department, String section, LocalDateTime startDate, LocalDateTime endDate) {
        this.user = user;
        this.name = name;
        this.department = department;
        this.section = section;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static Career makeCareer(User user, RequestCareerDto request) {

        Career response = new Career();

        response.user = user;
        response.name = request.getName();
        response.department = request.getDepartment();
        response.section = request.getSection();
        response.startDate = request.getStartDate();
        response.endDate = request.getEndDate();

        return response;
    }
}
