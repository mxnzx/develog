package com.ssafy.develog.interview.controller;

import com.ssafy.develog.interview.service.InterviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/?")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
}
