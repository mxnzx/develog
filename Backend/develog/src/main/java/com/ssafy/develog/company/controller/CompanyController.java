package com.ssafy.develog.company.controller;

import com.ssafy.develog.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/?")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
}
