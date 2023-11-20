package com.ssafy.develog.interview.service;

import com.ssafy.develog.common.AwsS3Uploader;
import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.common.domain.VoiceCheckType;
import com.ssafy.develog.common.exception.NotFoundException;
import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.company.domain.HistoryRepository;
import com.ssafy.develog.interview.domain.*;
import com.ssafy.develog.interview.domain.Record;
import com.ssafy.develog.interview.dto.request.*;
import com.ssafy.develog.interview.dto.response.*;
import com.ssafy.develog.resume.domain.ResumeDetail;
import com.ssafy.develog.resume.domain.ResumeDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterviewService {

    private final AwsS3Uploader awsS3Uploader;
    private final TailRepository tailRepository;
    private final VoiceRepository voiceRepository;
    private final RecordRepository recordRepository;
    private final HistoryRepository historyRepository;
    private final InterviewRepository interviewRepository;
    private final PredictionRepository predictionRepository;
    private final ResumeDetailRepository resumeDetailRepository;
    private final VoiceKeywordRepository voiceKeywordRepository;
    private final RecordDetailRepository recordDetailRepository;
    private final ScriptKeywordRepository scriptKeywordRepository;
    private final TailScriptKeywordRepository tailScriptKeywordRepository;
    private final RecordDetailKeywordRepository recordDetailKeywordRepository;
    private final EntityManager em;

    public ResultTemplate getCompanyInfo(Long historyId) {

        History history = historyRepository.findHistoryByHistoryId(historyId)
                .orElseThrow( () -> new NotFoundException(NotFoundException.HISTORY_NOT_FOUND));

        ResponseInterviewMainUnchanged response = ResponseInterviewMainUnchanged.from(history);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate postInterview(RequestPostingInterview request) {

        History findHistory = historyRepository.findById(request.getHistoryId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.HISTORY_NOT_FOUND));

        Interview postInterview = Interview.makeInterview(findHistory, request);
        interviewRepository.save(postInterview);

        //히스토리에도 업데이트
        findHistory.updateInterview(postInterview);


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(postInterview.getInterviewId()).build();
    }

    @Transactional
    public ResultTemplate postPredictionQuestion(RequestPredictionQuestion request) {

        ResumeDetail resumeDetail = resumeDetailRepository.findById(request.getResumeDetailId())
                .orElseThrow( () -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

        Interview interview = interviewRepository.findById(request.getInterviewId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        List<Prediction> predictions = request.getQuestionContents().stream()
                .map(question -> Prediction.makePrediction(interview, resumeDetail, question))
                .collect(Collectors.toList());

        predictionRepository.saveAll(predictions);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate postPredictionQuestionByUser(RequestPredictionQuestionByUser request) {

        ResumeDetail resumeDetail = resumeDetailRepository.findById(request.getResumeDetailId())
                .orElseThrow( () -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

        Interview interview = interviewRepository.findById(request.getInterviewId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        Prediction prediction = Prediction.makePredictionByUser(interview, resumeDetail, request.getQuestionContent());
        predictionRepository.save(prediction);
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prediction.getPredictionId()).build();
    }

    @Transactional
    public ResultTemplate postOnlyQuestionByUser(RequestOnlyQuestionByUser request) {

        Interview interview = interviewRepository.findById(request.getInterviewId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        Prediction prediction = Prediction.makeOnlyQuestionByUser(interview, request.getQuestionContent());
        predictionRepository.save(prediction);
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prediction.getPredictionId()).build();
    }


    public ResultTemplate getPerdictQuestionPage(Long interviewId, Long resumeDetailId, Long predictionId) {

        ResumeDetail findResumeDetail = resumeDetailRepository.findDetailByResumeDetail(resumeDetailId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

        ResponseForResume responseForResume = ResponseForResume.from(findResumeDetail);

        Prediction prediction = predictionRepository.findPredictionForQuestionPage(predictionId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

        ResponsePredictionPage response = ResponsePredictionPage.from(responseForResume, prediction);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getInterviewMain(Long resumeDetailId) {

        ResumeDetail resumeDetail = resumeDetailRepository.findResumeDetailWithPredictionByResumeDetail(resumeDetailId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

        ResponseInterviewMainChanged response = ResponseInterviewMainChanged.from(resumeDetail);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate postPredictionAnswer(RequestPostPredictionAnswer request) {

        Prediction prediction = predictionRepository.findById(request.getPredictionId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

        prediction.updateAnswer(request.getAnswerContent());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate postPredictionKeyword(RequestPostPredictionKeyword request) {

        Prediction prediction = predictionRepository.findById(request.getPredictionId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

        ScriptKeyword scriptKeyword = ScriptKeyword.makeScriptKeyword(prediction, request.getKeyword());
        scriptKeywordRepository.save(scriptKeyword);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(scriptKeyword.getScriptKeywordId()).build();
    }

    @Transactional
    public ResultTemplate deletePredictKeyword(Long keywordId) {

        ScriptKeyword scriptKeyword = scriptKeywordRepository.findById(keywordId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.SCRIPTKEYWORD_NOT_FOUND));

        scriptKeywordRepository.delete(scriptKeyword);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getTailDetail(Long predictionId) {

        List<ResponsePredictionWithKeywords> response = predictionRepository.findTailDetailsByPredictionId(predictionId).stream()
                .map(ResponsePredictionWithKeywords::from)
                .collect(Collectors.toList());


//        ResponseTailListDetail response = ResponseTailListDetail.from(prediction);
//        List<Voice> findVoice = voiceRepository.findTailDetailsByPrediction(predictionId);
//        ResponsePredictionWithKeywords prediction = findVoice.stream()
//                .filter(voice -> voice.getPrediction() != null)
//                .map(ResponsePredictionWithKeywords::from)
//                .collect(Collectors.toList()).get(0);
//
//        List<ResponseTail> tails = findVoice.stream()
//                .filter(voice -> voice.getTail() != null)
//                .map(ResponseTail::from)
//                .collect(Collectors.toList());
//
//        ResponsePredictionAndTail response = ResponsePredictionAndTail.from(prediction, tails);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate postPredictionVoice(MultipartFile multipartFile, Long predictionId) throws IOException {

        Prediction prediction = predictionRepository.findById(predictionId)
                .orElseThrow( () -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

        String fileName = awsS3Uploader.upload(multipartFile, "voiceRecord");

        Voice voice = Voice.makeVoiceByPrediction(prediction, fileName);
        voiceRepository.save(voice);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(voice.getVoiceId()).build();
    }

    @Transactional
    public ResultTemplate postTailVoice(MultipartFile multipartFile, Long tailId) throws IOException {

        Tail tail = tailRepository.findById(tailId)
                .orElseThrow( () -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

        String fileName = awsS3Uploader.upload(multipartFile, "voiceRecord");

        Voice voice = Voice.makeVoiceByTail(tail, fileName);
        voiceRepository.save(voice);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(voice.getVoiceId()).build();
    }

    @Transactional
    public ResultTemplate putVoice(MultipartFile multipartFile, Long voiceId) throws IOException {

        Voice voice = voiceRepository.findById(voiceId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.VOICE_NOT_FOUND));

        awsS3Uploader.delete("voiceRecord", voice.getVoiceUrl());
        String fileName = awsS3Uploader.upload(multipartFile, "voiceRecord");

        voice.updateVoiceUrl(fileName);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(voice.getVoiceId()).build();
    }

    @Transactional
    public ResultTemplate postAnalysisRecord(RequestVoiceAnalysis request) {

        Voice voice = voiceRepository.findById(request.getVoiceId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.VOICE_NOT_FOUND));

        List<VoiceKeyword> voiceKeywordList = voiceKeywordRepository.findAllByVoiceId(request.getVoiceId());

        if (!voiceKeywordList.isEmpty()) {
            voiceKeywordRepository.deleteAll(voiceKeywordList);
        }

        double sentenceSimilarityScore = ( request.getVoiceCheckType() == VoiceCheckType.P ) ?
                AnalysisService.jaccardSimilarity(voice.getPrediction().getAnswerContent(), request.getVoiceText()) :
                AnalysisService.jaccardSimilarity(voice.getTail().getTailAnswer(), request.getVoiceText());

        int speedScore = AnalysisService.speedAnalysis(request.getVoiceText(), request.getVoiceSecond());
        int containScore = AnalysisService.containScoreAnalysis(request);
        int totalSimilarity = (int) (sentenceSimilarityScore + speedScore + containScore);

        voice.updateAnalysis(totalSimilarity, request);

        voiceKeywordRepository.saveAll(request.getContainsKeyword().stream()
                .map(keyword -> VoiceKeyword.makeVoiceKeyword(keyword, voice, BaseCheckType.T))
                .collect(Collectors.toList()));

        voiceKeywordRepository.saveAll(request.getUnContainsKeyword().stream()
                .map(keyword -> VoiceKeyword.makeVoiceKeyword(keyword, voice, BaseCheckType.F))
                .collect(Collectors.toList()));

//        log.info("문자열 유사도 점수 : {}", sentenceSimilarityScore); // 30%
//        log.info("속도 점수 : {}", speedScore); // 30%
//        log.info("단어 포함도 점수 : {}", containScore); // 40%
//        log.info("최종 점수 !! : {}", totalSimilarity); // 100%

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getVoiceAnalysis(Long voiceId) {

        Voice voice = voiceRepository.findById(voiceId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.VOICE_NOT_FOUND));

        ResponseVoiceAnalysis response = ResponseVoiceAnalysis.from(voice);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate postTail(Long predictionId) {

        Prediction prediction = predictionRepository.findById(predictionId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

        Tail tail = Tail.makeTail(prediction);
        tailRepository.save(tail);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(tail.getTailId()).build();
    }

    @Transactional
    public ResultTemplate postTailTitle(RequestTailIdAndTailTitle request) {

        Tail tail = tailRepository.findById(request.getTailId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

        tail.updateTailTitle(request.getTailTitle());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate postTailAnswer(RequestTailIdAndTailAnswer request) {

        Tail tail = tailRepository.findById(request.getTailId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

        tail.updateTailAnswer(request.getTailAnswer());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate postTailKeyword(RequestTailIdAndKeyword request) {

        Tail tail = tailRepository.findById(request.getTailId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

        TailScriptKeyword tailScriptKeyword = TailScriptKeyword.makeTailScriptKeyword(tail, request.getKeyword());
        tailScriptKeywordRepository.save(tailScriptKeyword);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(tailScriptKeyword.getTailScriptKeywordId()).build();
    }

    @Transactional
    public ResultTemplate deleteTailKeyword(Long keywordId) {

        TailScriptKeyword tailScriptKeyword = tailScriptKeywordRepository.findById(keywordId)
                .orElseThrow( () -> new NotFoundException(NotFoundException.TAIL_KEYWORD_NOT_FOUND));

        tailScriptKeywordRepository.delete(tailScriptKeyword);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getQuestionList(Long interviewId) {

        Interview interview = interviewRepository.findInterviewWithPredictionAndTails(interviewId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        List<ResponsePredictionWithTails> response = ResponsePredictionWithTails.from(interview);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate postRecord(RequestRecord request) {

        Interview findInterview = interviewRepository.findById(request.getInterviewId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        Record record = Record.makeRecord(findInterview);
        recordRepository.save(record);
        em.flush();

        for (Long predictionId : request.getCheckedPredictionId()) {
            Prediction findPrediction = predictionRepository.findById(predictionId)
                    .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

            RecordDetail recordPredictionDetail = RecordDetail.makeRecordDetail(record, findPrediction, null);
            recordDetailRepository.save(recordPredictionDetail);
        }

        for (Long tailId : request.getCheckedTailId()) {
            Tail findTail = tailRepository.findById(tailId)
                    .orElseThrow(() -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

            RecordDetail recordTailDetail = RecordDetail.makeRecordDetail(record, null, findTail);
            recordDetailRepository.save(recordTailDetail);
        }

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate postRandomRecord(RequestRandomRecord request) {

        Interview findInterview = interviewRepository.findById(request.getInterviewId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.INTERVIEW_NOT_FOUND));

        Record record = Record.makeRecord(findInterview);
        recordRepository.save(record);
        em.flush();

        for (Long predictionId : request.getCheckedPredictionId()) {
            Prediction findPrediction = predictionRepository.findById(predictionId)
                    .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

            RecordDetail recordPredictionDetail = RecordDetail.makeRecordDetail(record, findPrediction, null);
            recordDetailRepository.save(recordPredictionDetail);
        }

        for (Long tailId : request.getCheckedTailId()) {
            Tail findTail = tailRepository.findById(tailId)
                    .orElseThrow(() -> new NotFoundException(NotFoundException.TAIL_NOT_FOUND));

            RecordDetail recordTailDetail = RecordDetail.makeRecordDetail(record, null, findTail);
            recordDetailRepository.save(recordTailDetail);
        }

        for (RequestRandomTail randomTail : request.getNewTail()) {

            Prediction findRandomPrediction = predictionRepository.findById(randomTail.getPredictionId())
                    .orElseThrow(() -> new NotFoundException(NotFoundException.PREDICTION_NOT_FOUND));

            Tail makeRandomTail = Tail.makeRandomTail(findRandomPrediction, randomTail);
            Tail tail = tailRepository.save(makeRandomTail);

            em.flush();

            RecordDetail recordTailDetail = RecordDetail.makeRecordDetail(record, null, tail);
            recordDetailRepository.save(recordTailDetail);
        }

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate updateRecord(RequestRecordResult request) {

        recordRepository.findById(request.getRecordId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.RECORD_NOT_FOUND));

        for (RequestRecordDetail requestRecordDetail : request.getRecordDetailResult()) {

            RecordDetail findRecordDetail = recordDetailRepository.findRecordDetailByRecordDetail(requestRecordDetail.getRecordDetailId())
                    .orElseThrow(() -> new NotFoundException(NotFoundException.RECORD_DETAIL_NOT_FOUND));

            double sentenceSimilarityScore = ( findRecordDetail.getPrediction() == null ) ? (findRecordDetail.getTail() == null) ? 0 :
                    AnalysisService.jaccardSimilarity(findRecordDetail.getTail().getTailAnswer(), requestRecordDetail.getScript()) :
                    AnalysisService.jaccardSimilarity(findRecordDetail.getPrediction().getAnswerContent(), requestRecordDetail.getScript());

            int speedScore = AnalysisService.speedAnalysis(requestRecordDetail.getScript(), requestRecordDetail.getVoiceSecond());
            int containScore = AnalysisService.containKeywordScoreAnalysis(requestRecordDetail);
            int totalSimilarity = (int) (sentenceSimilarityScore + speedScore + containScore);

            findRecordDetail.updateRecordDetail(requestRecordDetail, totalSimilarity);

            recordDetailKeywordRepository.saveAll(requestRecordDetail.getContainsKeyword().stream()
                    .map(keyword -> RecordDetailKeyword.makeKeyword(findRecordDetail, keyword, BaseCheckType.T))
                    .collect(Collectors.toList()));

            recordDetailKeywordRepository.saveAll(requestRecordDetail.getUnContainsKeyword().stream()
                    .map(keyword -> RecordDetailKeyword.makeKeyword(findRecordDetail, keyword, BaseCheckType.F))
                    .collect(Collectors.toList()));

            em.flush();
        }

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getRecordDetail(Long recordId) {

        List<RecordDetail> findRecordDetails = recordDetailRepository.findRecordDetailsByRecord(recordId);

        List<ResponseRecordDetail> recordDetails = findRecordDetails.stream()
                .map(ResponseRecordDetail::from)
                .collect(Collectors.toList());

        ResponseRecord response = ResponseRecord.from(findRecordDetails.get(0), recordDetails);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }
}
