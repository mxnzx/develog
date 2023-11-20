package com.ssafy.develog.user.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;
    private String name;

    @Enumerated(EnumType.STRING)
    private BaseCheckType isActivate;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String email, String name, BaseCheckType isActivate, Role role) {
        this.email = email;
        this.name = name;
        this.isActivate = isActivate;
        this.role = role;
    }

    public void updateDeactivate() {
        this.isActivate = BaseCheckType.F;
    }
}
