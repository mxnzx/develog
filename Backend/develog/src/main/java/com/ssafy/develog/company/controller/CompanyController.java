package com.ssafy.develog.company.controller;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.company.dto.request.RequestCompany;
import com.ssafy.develog.company.dto.request.RequestCompanyDetail;
import com.ssafy.develog.company.dto.request.RequestHistory;
import com.ssafy.develog.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/list/{userId}")
    public ResultTemplate getCompany(@PathVariable("userId") Long userId) {
        return companyService.getCompany(userId);
    }

    @PostMapping("/add/{userId}")
    public ResultTemplate addCompany(@PathVariable("userId") Long userId, @RequestBody RequestCompany request) {
        return companyService.addCompany(userId, request);
    }

    @GetMapping("/search")
    public ResultTemplate searchCompany(){
        return companyService.searchCompany();
    }

    @GetMapping("/detail/header/{companyId}")
    public ResultTemplate getHeader(@PathVariable("companyId") Long companyId){
        return companyService.getHeader(companyId);
    }

    @PutMapping("")
    public ResultTemplate updateCompany(@RequestBody RequestCompanyDetail request){
        return companyService.updateCompany(request);
    }

    @GetMapping("/info/list/{companyId}")
    public ResultTemplate getCompanyList(@PathVariable("companyId") Long companyId){
        return companyService.getCompanyList(companyId);
    }

    @PostMapping("")
    public ResultTemplate addHistory(@RequestBody RequestHistory request){
        return companyService.addHistory(request);
    }

    @GetMapping("/resume/{resumeId}")
    public ResultTemplate getResumeList(@PathVariable("resumeId") Long resumeId){
        return companyService.getResumeList(resumeId);
    }

    @GetMapping("/interview/{interviewId}")
    public ResultTemplate getInterviewList(@PathVariable("interviewId") Long interviewId){
        return companyService.getInterviewList(interviewId);
    }

    @GetMapping("/test/list/{companyId}")
    public ResultTemplate getRecordList(@PathVariable("companyId") Long companyId){
        return companyService.getRecordList(companyId);
    }

    @DeleteMapping("/{historyId}")
    public ResultTemplate deleteHistory(@PathVariable("historyId") Long historyId){
        return companyService.deleteHistory(historyId);
    }

}
