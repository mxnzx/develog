package com.ssafy.develog.company.service;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.common.exception.NotFoundException;
import com.ssafy.develog.company.domain.*;
import com.ssafy.develog.company.dto.request.RequestCompany;
import com.ssafy.develog.company.dto.request.RequestCompanyDetail;
import com.ssafy.develog.company.dto.request.RequestHistory;
import com.ssafy.develog.company.dto.response.*;
import com.ssafy.develog.interview.domain.PredictionRepository;
import com.ssafy.develog.interview.domain.RecordRepository;
import com.ssafy.develog.interview.dto.response.ResponseRecordId;
import com.ssafy.develog.resume.domain.ResumeDetailRepository;
import com.ssafy.develog.resume.dto.response.ResponseResumeDetail;
import com.ssafy.develog.resume.dto.response.ResponseUserResume;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyService {

    private final EntityManager em;
    private final CompanyQueryRepository companyQueryRepository;
    private final ResumeDetailRepository resumeDetailRepository;
    private final CompanyInfoRepository companyInfoRepository;
    private final PredictionRepository predictionRepository;
    private final CompanyRepository companyRepository;
    private final HistoryRepository historyRepository;
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;


    public ResultTemplate getCompany(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));


        List<ResponseCompany> response = companyRepository.findCompanyByUser(userId).stream()
                .map(ResponseCompany::from)
                .collect(Collectors.toList());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate addCompany(Long userId, RequestCompany request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        CompanyInfo findInfo = request.getCompanyInfoId() == -1 ?
                companyInfoRepository.save(CompanyInfo.makeCompanyInfo(request.getName())) :
                companyInfoRepository.findById(request.getCompanyInfoId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.COMPANY_INFO_NOT_FOUND));

        em.flush();

        return companyQueryRepository.checkCompany(userId, request.getCompanyInfoId(), request.getName())
                .map(company -> {
                    ResponseCompanyId response = ResponseCompanyId.from(company);
                    return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
                })
                .orElseGet(() -> {
                    Company company = Company.makeCompany(request, findInfo, user);
                    Company makeCompany = companyRepository.save(company);
                    ResponseCompanyId response = ResponseCompanyId.from(makeCompany);
                    return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
                });


    }
    public ResultTemplate searchCompany() {

        List<ResponseSearchCompany> response = companyInfoRepository.findAll()
                .stream().map(ResponseSearchCompany::from)
                .collect(Collectors.toList());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getHeader(Long companyId) {

        companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.COMPANY_NOT_FOUND));

        ResponseHeader response = companyRepository.findHeaderByCompany(companyId)
                .map(ResponseHeader::from)
                .orElseThrow(() -> new NotFoundException(NotFoundException.HEADER_NOT_FOUND));

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate updateCompany(RequestCompanyDetail request) {

        Company findCompany = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.COMPANY_NOT_FOUND));

        findCompany.updateCompany(request);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }

    public ResultTemplate getCompanyList(Long companyId) {

        List<ResponseHistory> response = historyRepository.findHistoryByCompany(companyId)
                .stream().map(ResponseHistory::from)
                .collect(Collectors.toList());

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();

    }

    @Transactional
    public ResultTemplate addHistory(RequestHistory request) {

        Company findCompany = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.COMPANY_NOT_FOUND));

        History history = History.makeHistory(request, findCompany);
        historyRepository.save(history);

        ResponseHistoryId response = ResponseHistoryId.from(history);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getResumeList(Long resumeId) {

        List<ResponseResumeDetail> findResumeDetails = resumeDetailRepository.findResumeDetailsByResume(resumeId)
                .stream().map(ResponseResumeDetail::from)
                .collect(Collectors.toList());

        ResponseUserResume response = ResponseUserResume.from(findResumeDetails);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getInterviewList(Long interviewId) {

        List<ResponsePredictionQuestion> response = predictionRepository.findPredictionsByInterview(interviewId)
                .stream().map(ResponsePredictionQuestion::from)
                .collect(Collectors.toList());


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getRecordList(Long companyId) {

        List<ResponseRecordId> response = recordRepository.findRecordByCompany(companyId)
                .stream().map(ResponseRecordId::from)
                .collect(Collectors.toList());


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    @Transactional
    public ResultTemplate deleteHistory(Long historyId) {

        History history = historyRepository.findById(historyId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.HISTORY_NOT_FOUND));
        history.updateTime();
        historyRepository.delete(history);

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data("success").build();
    }
}