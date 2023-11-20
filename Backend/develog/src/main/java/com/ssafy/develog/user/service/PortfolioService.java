package com.ssafy.develog.user.service;


import com.ssafy.develog.user.domain.*;
import com.ssafy.develog.user.dto.SchoolDto;
import com.ssafy.develog.user.dto.request.*;
import com.ssafy.develog.user.dto.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PortfolioService {

    @PersistenceContext
    private final EntityManager em;

    private final SchoolRepository schoolRepository;
    private final CareerRepository careerRepository;
    private final LicenseRepository licenseRepository;
    private final EduRepository eduRepository;
    private final ProjectRepository projectRepository;
    private final LanguageRepository languageRepository;


    public List<ResponseCareerDto> viewCareer(Long userId) {

        List<Career> careers = careerRepository.findByUserUserId(userId);

            return careers.stream()
                    .map((Career c) -> ResponseCareerDto.builder()
                            .name(c.getName())
                            .section(c.getSection())
                            .department(c.getDepartment())
                            .startDate(c.getStartDate())
                            .endDate(c.getEndDate())
                            .build())
                    .collect(Collectors.toList());
    }

    @Transactional
    public void saveCareer(List<RequestCareerDto> requestCareerDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<Career> existCareers = careerRepository.findByUserUserId(user.getUserId());
        if(!existCareers.isEmpty()) {
            careerRepository.deleteAll(existCareers);
            em.flush();
        }

        List<Career> careers = requestCareerDtos.stream()
                .map(requestCareerDto -> Career.makeCareer(user, requestCareerDto))
                .collect(Collectors.toList());

        careerRepository.saveAll(careers);
    }

    public List<ResponseLicenseDto> viewLicense(Long userId) {

        List<License> licenses = licenseRepository.findByUserUserId(userId);

        return licenses.stream()
                .map((License l) -> ResponseLicenseDto.builder()
                        .title(l.getTitle())
                        .organization(l.getOrganization())
                        .serialNum(l.getSerialNum())
                        .acquisitionDate(l.getAcquisitionDate())
                        .expireDate(l.getExpireDate())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveLicense(List<RequestLicenseDto> requestLicenseDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<License> existLicenses = licenseRepository.findByUserUserId(user.getUserId());
        if(!existLicenses.isEmpty()) {
            licenseRepository.deleteAll(existLicenses);
            em.flush();
        }

        List<License> licenses = requestLicenseDtos.stream()
                .map(requestLicenseDto -> License.makeLicense(user, requestLicenseDto))
                .collect(Collectors.toList());

        licenseRepository.saveAll(licenses);
    }

    public List<ResponseEduDto> viewEdu(Long userId) {
        List<Edu> edus = eduRepository.findByUserUserId(userId);

        return edus.stream()
                .map((Edu e) -> ResponseEduDto.builder()
                        .title(e.getTitle())
                        .organization(e.getOrganization())
                        .period(e.getPeriod())
                        .description(e.getDescription())
                        .startDate(e.getStartDate())
                        .endDate(e.getEndDate())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveEdu(List<RequestEduDto> requestEduDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<Edu> existEdus = eduRepository.findByUserUserId(user.getUserId());
        if(!existEdus.isEmpty()) {
            eduRepository.deleteAll(existEdus);
            em.flush();
        }

        List<Edu> edus = requestEduDtos.stream()
                .map(requestEduDto -> Edu.makeEdu(user, requestEduDto))
                .collect(Collectors.toList());

        eduRepository.saveAll(edus);
    }

    public List<ResponseProjectDto> viewProject(Long userId) {

        List<Project> projects = projectRepository.findByUserUserId(userId);

        return projects.stream()
                .map((Project p) -> ResponseProjectDto.builder()
                        .title(p.getTitle())
                        .organization(p.getOrganization())
                        .award(p.getAward())
                        .description(p.getDescription())
                        .startDate(p.getStartDate())
                        .endDate(p.getEndDate())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveProject(List<RequestProjectDto> requestProjectDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<Project> existProjects = projectRepository.findByUserUserId(user.getUserId());
        if(!existProjects.isEmpty()) {
            projectRepository.deleteAll(existProjects);
            em.flush();
        }

        List<Project> projects = requestProjectDtos.stream()
                .map(requestProjectDto -> Project.makeProject(user, requestProjectDto))
                .collect(Collectors.toList());
        projectRepository.saveAll(projects);
    }

    public List<ResponseLanguageDto> viewLanguage(Long userId) {

        List<Language> languages = languageRepository.findByUserUserId(userId);

        return languages.stream()
                .map((Language l) -> ResponseLanguageDto.builder()
                        .title(l.getTitle())
                        .organization(l.getOrganization())
                        .grade(l.getGrade())
                        .startDate(l.getStartDate())
                        .endDate(l.getEndDate())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveLanguage(List<RequestLanguageDto> requestLanguageDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<Language> existLanguages = languageRepository.findByUserUserId(user.getUserId());
        if(!existLanguages.isEmpty()) {
            languageRepository.deleteAll(existLanguages);
            em.flush();
        }

        List<Language> languages = requestLanguageDtos.stream()
                .map(requestLanguageDto -> Language.makeLanguage(user, requestLanguageDto))
                .collect(Collectors.toList());

        languageRepository.saveAll(languages);
    }

    public ResponseSchoolDto viewSchool(Long userId) {

        List<School> allSchools = schoolRepository.findByUserUserId(userId);

        Map<SchoolType, List<SchoolDto>> schoolDtoMap = allSchools.stream()
                .map(SchoolDto::from)
                .collect(Collectors.groupingBy(schoolDto -> SchoolType.valueOf(schoolDto.getSchoolType())));

        return ResponseSchoolDto.builder()
                .HIGH(schoolDtoMap.get(SchoolType.HIGH) == null ? new ArrayList<>() : schoolDtoMap.get(SchoolType.HIGH))
                .UNI(schoolDtoMap.get(SchoolType.UNI) == null ? new ArrayList<>() : schoolDtoMap.get(SchoolType.UNI))
                .GRAD(schoolDtoMap.get(SchoolType.GRAD) == null ? new ArrayList<>() : schoolDtoMap.get(SchoolType.GRAD))
                .build();
    }

    public void saveSchool(List<RequestSchoolDto> requestSchoolDtos, User user) {

        // userId 로 찾았을 때 null 이 아니면 삭제 후 바로 적용
        List<School> existSchools = schoolRepository.findByUserUserId(user.getUserId());
        if(!existSchools.isEmpty()) {
           schoolRepository.deleteAll(existSchools);
           em.flush();
        }

        List<School> schools = requestSchoolDtos.stream()
                .map(requestSchoolDto -> School.makeSchool(user, requestSchoolDto))
                .collect(Collectors.toList());

        schoolRepository.saveAll(schools);
    }
}
