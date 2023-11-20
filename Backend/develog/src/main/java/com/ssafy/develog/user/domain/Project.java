package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestProjectDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;
    private String organization;
    private String award;
    private String description;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static Project makeProject(User user, RequestProjectDto request){
        Project response = new Project();

        response.user = user;
        response.title = request.getTitle();
        response.organization = request.getOrganization();
        response.award = request.getAward();
        response.description = request.getDescription();
        response.startDate = request.getStartDate();
        response.endDate = request.getEndDate();

        return response;
    }
}
