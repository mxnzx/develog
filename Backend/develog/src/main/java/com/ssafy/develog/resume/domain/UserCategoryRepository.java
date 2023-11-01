package com.ssafy.develog.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    @Query("select uc from UserCategory uc " +
            "where uc.user.userId = :userId")
    List<UserCategory> findUserCategoryByUser(@Param("userId") Long userId);

}
