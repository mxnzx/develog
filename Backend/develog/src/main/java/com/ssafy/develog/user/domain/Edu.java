package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestEduDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Edu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eduId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;
    private String organization;
    private String period;
    private String description;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static Edu makeEdu(User user, RequestEduDto request) {

        Edu response = new Edu();

        response.user = user;
        response.title = request.getTitle();
        response.organization = request.getOrganization();
        response.period = request.getPeriod();
        response.description = request.getDescription();
        response.startDate = request.getStartDate();
        response.endDate = request.getEndDate();

        return response;
    }
}
