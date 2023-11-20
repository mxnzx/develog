package com.ssafy.develog.resume.controller;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.resume.dto.request.RequestAddResume;
import com.ssafy.develog.resume.dto.request.RequestResume;
import com.ssafy.develog.resume.dto.request.RequestUserCategory;
import com.ssafy.develog.resume.dto.request.RequestResumeIdWithNum;
import com.ssafy.develog.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping("/similar")
    public ResultTemplate getSimilarResume(@RequestParam("userId") Long userId,
                                           @RequestParam("userCategoryList") List<Long> userCategoryList,
                                           @RequestParam("categoryList") List<Long> categoryList) {
        return resumeService.getSimilarResume(userId, userCategoryList, categoryList);
    }

    @GetMapping("/info/{historyId}")
    public ResultTemplate getHistory(@PathVariable("historyId") Long historyId) {
        return resumeService.getHistory(historyId);
    }

    @PostMapping("")
    public ResultTemplate addResume(@RequestBody RequestAddResume requestAddResume) {
        return resumeService.addResume(requestAddResume);
    }

    @GetMapping("/{resumeId}")
    public ResultTemplate getResumeDetail(@PathVariable("resumeId") Long resumeId) {
        return resumeService.getResumeDetail(resumeId);
    }

    @PostMapping("/detail")
    public ResultTemplate addResumeDetail(@RequestBody RequestResumeIdWithNum request){
        return resumeService.addResumeDetail(request);
    }

    @DeleteMapping("/{resumeDetailId}")
    public ResultTemplate removeResumeDetail(@PathVariable("resumeDetailId") Long resumeDetailId){
        return resumeService.removeResumeDetail(resumeDetailId);
    }

    @GetMapping("/category/{userId}")
    public ResultTemplate getUserCategory(@PathVariable("userId") Long userId){
        return resumeService.getUserCategory(userId);
    }

    @PutMapping("/temp")
    public ResultTemplate addTempResume(@RequestBody RequestResume request){
        return resumeService.addTempResume(request);
    }

    @PutMapping("/final")
    public ResultTemplate addFinalResume(@RequestBody RequestResume request){
        return resumeService.addTempResume(request);
    }


    @PostMapping("/keyword")
    public ResultTemplate addKeyword(@RequestBody RequestUserCategory request){
        return resumeService.addKeyword(request);
    }
}
