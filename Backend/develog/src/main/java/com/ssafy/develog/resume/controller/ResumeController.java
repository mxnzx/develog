package com.ssafy.develog.resume.controller;

import com.ssafy.develog.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/?")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
}
