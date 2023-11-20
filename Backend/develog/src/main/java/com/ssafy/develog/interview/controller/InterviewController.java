package com.ssafy.develog.interview.controller;

import com.ssafy.develog.common.AwsS3Uploader;
import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.interview.dto.request.*;
import com.ssafy.develog.interview.service.InterviewService;
import com.ssafy.develog.interview.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interview")
@Tag(name = "Interview", description = "면접 관련 API")
public class InterviewController {

    private final AwsS3Uploader awsS3Uploader;
    private final InterviewService interviewService;
    private final RecordService recordService;

    @GetMapping("")
    @Operation(summary = "메인페이지 조회1", description = "변화하지 않는 메인페이지 조회 기능")
    public ResultTemplate getCompanyInfo(@RequestParam("historyId") Long historyId) {

        return interviewService.getCompanyInfo(historyId);
    }

    @GetMapping("/resume")
    public ResultTemplate getInterviewMain(@RequestParam("resumeDetailId") Long resumeDetailId) {

        return interviewService.getInterviewMain(resumeDetailId);
    }


    @PostMapping("")
    public ResultTemplate postInterview(@RequestBody RequestPostingInterview request) {

        return interviewService.postInterview(request);
    }

    @PostMapping("/openAI/question")
    public ResultTemplate postPredictionQuestion(@RequestBody RequestPredictionQuestion request) {

        return interviewService.postPredictionQuestion(request);
    }

    @PostMapping("/resume/onlyHerQuestion")
    public ResultTemplate postPredictionQuestionByUser(@RequestBody RequestPredictionQuestionByUser request) {

        return interviewService.postPredictionQuestionByUser(request);
    }

    @PostMapping("/onlyHerQuestion")
    public ResultTemplate postPredictionQuestionByUserNotResume(@RequestBody RequestOnlyQuestionByUser request) {

        return interviewService.postOnlyQuestionByUser(request);
    }

    @GetMapping("/prediction/list")
    public ResultTemplate getPredictQuestionPage(@RequestParam("interviewId") Long interviewId,
                                                 @RequestParam("resumeDetailId") Long resumeDetailId,
                                                 @RequestParam("predictionId") Long predictionId) {

        return interviewService.getPerdictQuestionPage(interviewId, resumeDetailId, predictionId);
    }

    @PostMapping("/prediction/answer")
    public ResultTemplate postPredictionAnswer(@RequestBody RequestPostPredictionAnswer request) {

        return interviewService.postPredictionAnswer(request);
    }

    @PostMapping("/prediction/keyword")
    public ResultTemplate postPredictionKeyword(@RequestBody RequestPostPredictionKeyword request){

        return interviewService.postPredictionKeyword(request);
    }

    @DeleteMapping("/prediction/keyword")
    public ResultTemplate deletePredictionKeyword(@RequestBody RequestDeleteKeyword request){

        return interviewService.deletePredictKeyword(request.getKeywordId());
    }

    @GetMapping("/tail/{predictionId}")
    public ResultTemplate getTailDetail(@PathVariable("predictionId") Long predictionId) {

        return interviewService.getTailDetail(predictionId);
    }

    @PostMapping(value = "/s3/voice/prediction")
    public ResultTemplate postPredictionVoice(@RequestPart("predictionId") RequestPredictionId request,
                                        @RequestPart("file") MultipartFile multipartFile) throws IOException {

        return interviewService.postPredictionVoice(multipartFile, request.getPredictionId());
    }

    @PostMapping(value = "/s3/voice/tail")
    public ResultTemplate postTailVoice(@RequestPart("tailId") RequestTailId request,
                                        @RequestPart("file") MultipartFile multipartFile) throws IOException {

        return interviewService.postTailVoice(multipartFile, request.getTailId());
    }

    @PutMapping(value = "/s3/voice/reupload")
    public ResultTemplate putVoice(@RequestPart("voiceId") RequestVoiceId request,
                                        @RequestPart("file") MultipartFile multipartFile) throws IOException {

        return interviewService.putVoice(multipartFile, request.getVoiceId());
    }

    @PostMapping(value = "/analysis/voice")
    public ResultTemplate postAnalysisRecord(@RequestBody RequestVoiceAnalysis request) {

        return interviewService.postAnalysisRecord(request);
    }

    @GetMapping(value = "/prediction/voice/{voiceId}")
    public ResultTemplate getVoiceAnalysis(@PathVariable("voiceId") Long voiceId){

        return interviewService.getVoiceAnalysis(voiceId);
    }


    @PostMapping("/tail")
    public ResultTemplate postTail(@RequestBody RequestPredictionId request) {

        return interviewService.postTail(request.getPredictionId());
    }

    @PostMapping(value = "/tail/title")
    public ResultTemplate postTailTitle(@RequestBody RequestTailIdAndTailTitle request){

        return interviewService.postTailTitle(request);
    }

    @PostMapping(value = "/tail/script")
    public ResultTemplate postTailScript(@RequestBody RequestTailIdAndTailAnswer request){

        return interviewService.postTailAnswer(request);
    }

    @PostMapping(value = "/tail/keyword")
    public ResultTemplate postTailKeyword(@RequestBody RequestTailIdAndKeyword request){

        return interviewService.postTailKeyword(request);
    }

    @DeleteMapping(value = "tail/keyword")
    public ResultTemplate deleteTailKeyword(@RequestBody RequestDeleteKeyword request){

        return interviewService.deleteTailKeyword(request.getKeywordId());
    }

    @GetMapping(value = "/exam/question/{interviewId}")
    public ResultTemplate getQuestionList(@PathVariable("interviewId") Long interviewId){

        return interviewService.getQuestionList(interviewId);
    }

    @PostMapping(value = "/exam/question")
    public ResultTemplate postRecord(@RequestBody RequestRecord request){

        return interviewService.postRecord(request);
    }

    @PostMapping(value = "/exam/random/question")
    public ResultTemplate postRandomRecord(@RequestBody RequestRandomRecord request){

        return interviewService.postRandomRecord(request);
    }

    @PutMapping(value = "/exam/question")
    public ResultTemplate updateRecord(@RequestBody RequestRecordResult request){

        return interviewService.updateRecord(request);
    }

    @GetMapping(value = "/exam/record/{recordId}")
    public ResultTemplate getRecordDetail(@PathVariable("recordId") Long recordId){

        return interviewService.getRecordDetail(recordId);
    }


    @DeleteMapping("/exam/{recordId}")
    public ResultTemplate deleteExamFile(@PathVariable("recordId") Long recordId) {

        recordService.deleteExamFile(recordId);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }
}
