package com.ssafy.develog.user.controller;

import com.ssafy.develog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/?")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
}
