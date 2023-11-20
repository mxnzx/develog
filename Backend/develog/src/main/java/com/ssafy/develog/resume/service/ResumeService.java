package com.ssafy.develog.resume.service;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.common.exception.NotFoundException;
import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.company.domain.HistoryRepository;
import com.ssafy.develog.company.dto.response.ResponseHistoryWithCompany;
import com.ssafy.develog.resume.domain.*;
import com.ssafy.develog.resume.dto.request.*;
import com.ssafy.develog.resume.dto.response.*;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final HistoryRepository historyRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final ResumeDetailRepository resumeDetailRepository;
    private final ResumeDetailCategoryRepository resumeDetailCategoryRepository;
    private final EntityManager em;

    public ResultTemplate getSimilarResume(Long userId, List<Long> userCategoryList, List<Long> categoryList) {

        List<ResponseResumeDetail> findSimilar = resumeDetailRepository.findResumeDetailByKeyword(userId).stream()
                .filter(resumeDetail -> {
                    return resumeDetail.getResumeDetailCategoryList().stream()
                            .anyMatch(resumeDetailCategory -> {
                                return (resumeDetailCategory.getCategory() != null && categoryList.contains(resumeDetailCategory.getCategory().getCategoryId()))
                                        || (resumeDetailCategory.getUserCategory() != null && userCategoryList.contains(resumeDetailCategory.getUserCategory().getUserCategoryId()));
                            });
                })
                .map(ResponseResumeDetail::from)
                .collect(Collectors.toList());

        ResponseResumeSimilarDetail response = ResponseResumeSimilarDetail.from(findSimilar);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getHistory(Long historyId) {

        ResponseHistoryWithCompany response = historyRepository.findHistoryWithCompanyByHistory(historyId)
                .map(ResponseHistoryWithCompany::from)
                .orElseThrow(() -> new NotFoundException(NotFoundException.HISTORY_NOT_FOUND));


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate addResume(RequestAddResume requestAddResume) {

        History findHistory = historyRepository.findById(requestAddResume.getHistoryId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.HISTORY_NOT_FOUND));

        Resume resume = Resume.makeResume(findHistory, requestAddResume);
        resume.updateTime();
        resumeRepository.save(resume);
        //히스토리에도 자소서 업데이트 해야 함
        findHistory.updateResume(resume);

        ResponseResumeId response = ResponseResumeId.from(resume);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getResumeDetail(Long resumeId) {

        List<ResponseResumeTotalDetail> findTotalResumeDetails = resumeDetailRepository.findResumeDetailsByResume(resumeId).stream()
                .map(ResponseResumeTotalDetail::from)
                .collect(Collectors.toList());

        ResponseResume response = ResponseResume.from(resumeId, findTotalResumeDetails.size(), findTotalResumeDetails);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate addResumeDetail(RequestResumeIdWithNum request) {

        Resume findResume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.RESUME_NOT_FOUND));

        ResumeDetail resumeDetail = ResumeDetail.makeResumeDetail(findResume, request);
        resumeDetailRepository.save(resumeDetail);

        ResponseResumeDetailId response = ResponseResumeDetailId.from(resumeDetail);
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate removeResumeDetail(Long resumeDetailId) {

        ResumeDetail resumeDetail = resumeDetailRepository.findById(resumeDetailId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

        resumeDetail.getResume().updateTime();
        resumeDetailRepository.delete(resumeDetail);

        /*
        얘랑 같은 resumeId값을 가지고 있는 애들 찾고,
        현재 questionNum 보다 뒤인 애들을 -1 해서 줄인다.
         */


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getUserCategory(Long userId) {

        List<UserCategory> userCategories = userCategoryRepository.findUserCategoryByUser(userId);
        List<Category> categories = categoryRepository.findAll();

        ResponseTotalCategory response = ResponseTotalCategory.from(userCategories, categories);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }
    @Transactional
    public ResultTemplate addTempResume(RequestResume request) {

        log.info(String.valueOf(request.getResumeId()));
        log.info(String.valueOf(request.getUserId()));
        log.info(String.valueOf(request.getIsStore()));
        log.info(String.valueOf(request.getDetails().size()));

        Resume findResume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.RESUME_NOT_FOUND));

        findResume.updateTime();
        findResume.updateIsStore(request.getIsStore());
        for (RequestResumeDetail detail : request.getDetails()) {
            ResumeDetail findDetail = resumeDetailRepository.findResumeDetailsByResumeDetail(detail.getResumeDetailId())
                    .orElseThrow(() -> new NotFoundException(NotFoundException.RESUMEDETAIL_NOT_FOUND));

            findDetail.deleteResumeDetailCategory();
            em.flush();

            if(detail.getCategoryList().isEmpty()) {
                findDetail.updateResumeDetail(findResume, detail, null, null);
            }

            for (Long categoryId : detail.getCategoryList()){
                Category category = categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));
                findDetail.updateResumeDetail(findResume, detail, category, null);
            }

            for (Long userCategoryId : detail.getUserCategoryList()) {
                UserCategory userCategory = userCategoryRepository.findById(userCategoryId)
                        .orElseThrow(() -> new NotFoundException(NotFoundException.USER_CATEGORY_RESUME_NOT_FOUND));
                findDetail.updateResumeDetail(findResume, detail, null, userCategory);
            }
        }
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    @Transactional
    public ResultTemplate addKeyword(RequestUserCategory request) {

        User findUser = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        ResponseUserCategoryId response = ResponseUserCategoryId
                .from(userCategoryRepository.save(UserCategory.makeUserCategory(findUser, request.getKeyword())));

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }
}
