package com.ssafy.develog.user.controller;


import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.dto.request.*;
import com.ssafy.develog.user.dto.response.*;
import com.ssafy.develog.user.service.PortfolioService;
import com.ssafy.develog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final UserService userService;

    @GetMapping("/school")
    public ResultTemplate viewSchool(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        ResponseSchoolDto responseCareerDto = portfolioService.viewSchool(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseCareerDto)
                .build();
    }

    @Transactional
    @PostMapping("/school")
    public ResultTemplate registSchool(HttpServletRequest httpServletRequest,
                                       @RequestBody List<RequestSchoolDto> requestSchoolDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveSchool(requestSchoolDtos, user);

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    @GetMapping("/career")
    public ResultTemplate viewCareer(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        List<ResponseCareerDto> responseCareerDtos = portfolioService.viewCareer(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseCareerDtos)
                .build();
    }

    @PostMapping("/career")
    public ResultTemplate registCareer(HttpServletRequest httpServletRequest,
                                 @RequestBody List<RequestCareerDto> requestCareerDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveCareer(requestCareerDtos, user);


        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    @GetMapping("/license")
    public ResultTemplate viewLicense(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        List<ResponseLicenseDto> responseCareerDtos = portfolioService.viewLicense(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseCareerDtos)
                .build();
    }

    @PostMapping("/license")
    public ResultTemplate registLicense(HttpServletRequest httpServletRequest,
                                 @RequestBody List<RequestLicenseDto> requestLicenseDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveLicense(requestLicenseDtos, user);


        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    @GetMapping("/edu")
    public ResultTemplate viewEdu(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        List<ResponseEduDto> responseEduDtos = portfolioService.viewEdu(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseEduDtos)
                .build();
    }

    @PostMapping("/edu")
    public ResultTemplate registEdu(HttpServletRequest httpServletRequest,
                                 @RequestBody List<RequestEduDto> requestEduDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveEdu(requestEduDtos, user);


        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    @GetMapping("/project")
    public ResultTemplate viewProject(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        List<ResponseProjectDto> responseProjectDtos = portfolioService.viewProject(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseProjectDtos)
                .build();
    }

    @PostMapping("/project")
    public ResultTemplate registProject(HttpServletRequest httpServletRequest,
                                        @RequestBody List<RequestProjectDto> requestProjectDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveProject(requestProjectDtos, user);


        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    @GetMapping("/language")
    public ResultTemplate viewLanguage(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        List<ResponseLanguageDto> responseLanguageDtos = portfolioService.viewLanguage(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseLanguageDtos)
                .build();
    }

    @PostMapping("/language")
    public ResultTemplate registLanguage(HttpServletRequest httpServletRequest,
                                 @RequestBody List<RequestLanguageDto> requestLanguageDtos) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        portfolioService.saveLanguage(requestLanguageDtos, user);


        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }


}
