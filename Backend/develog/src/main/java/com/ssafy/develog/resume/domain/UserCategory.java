package com.ssafy.develog.resume.domain;

import com.ssafy.develog.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCategoryId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String keyword;


    public static UserCategory makeUserCategory(User user, String keyword){

        UserCategory response = new UserCategory();
        response.user = user;
        response.keyword = keyword;

        return response;
    }
}
