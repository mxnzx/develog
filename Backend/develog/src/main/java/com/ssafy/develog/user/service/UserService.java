package com.ssafy.develog.user.service;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.exception.NotFoundException;
import com.ssafy.develog.company.domain.*;
import com.ssafy.develog.interview.domain.PredictionRepository;
import com.ssafy.develog.security.oauth2.kakao.KakaoOAuth2;
import com.ssafy.develog.security.oauth2.kakao.KakaoUserDto;
import com.ssafy.develog.user.domain.Role;
import com.ssafy.develog.user.domain.SocialType;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.domain.UserRepository;
import com.ssafy.develog.user.dto.LoginDto;
import com.ssafy.develog.user.dto.response.*;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    @Value("${jwt.secretKey}")
    private String secretKey;
    private final UserRepository userRepository;
    private final KakaoOAuth2 kakaoOAuth2;
    private final HistoryRepository historyRepository;
    private final CompanyRepository companyRepository;

    @Transactional(readOnly = true)
    public User findUserByJwtToken(String token) {

        String id = String.valueOf(Jwts.parser().setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token).getBody().get("id"));

        return userRepository.findById(Long.parseLong(id))
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
    }

    @Transactional
    public LoginDto findKakaoUserByAuthorizedCode(String authorizedCode, String redirectUri) {

        // 카카오 OAuth2 통한 카카오 사용자 정보 조회
        KakaoUserDto kakaoUserDto = kakaoOAuth2.getUserInfo(authorizedCode, redirectUri);

        // 여기서 이메일을 비교한다
        String userEmail = kakaoUserDto.getEmail();

        // 받아온 아이를 DB에 넣는다. 만약 DB에 있다면 로그인, 아니라면 회원가입을 진행한다!
        User user = userRepository.findByEmail(userEmail);

        if(user != null) {
            // 로그인 진행
            return LoginDto.from(user, kakaoUserDto, SocialType.KAKAO);
        } else {
            // 회원가입 진행
            User newUser = new User(kakaoUserDto.getEmail(), kakaoUserDto.getName(), BaseCheckType.T, Role.USER);
            userRepository.save(newUser);

            return LoginDto.from(newUser, kakaoUserDto, SocialType.KAKAO);
        }
    }

    @Transactional
    public void deactivateUser(Long userId, String activate) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        if(activate.equals(String.valueOf(BaseCheckType.F))) user.updateDeactivate();
        // 만약 여기서 트랜잭션이 제대로 수행되지 않았을 때 처리는 어떻게?
    }

    public ResponseUserInfoDto viewInfo(Long userId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        return ResponseUserInfoDto.from(user);
    }

    /**
     * 메인페이지에서 정보 다 가져오는 서비스
     * @param user : 유저 객체
     * @return 유저정보, 관심기업리스트, 히스토리의 자소서, 면접예상질문대비
     */
    public ResponseMain viewMain(User user) {

        List<History> mainInfos = historyRepository.findHistoryWithResumeAndInterviewAndCompanyInfoByUser(user.getUserId());
        List<Company> companyByUser = companyRepository.findCompanyByUser(user.getUserId());

//        List<ResponseMainInterestingCompany> mainInterestingCompanies = mainInfos.stream()
//                .map(info -> ResponseMainInterestingCompany.from(info.getCompany()))
//                .filter(Objects::nonNull)
//                .collect(Collectors.toList());

        List<ResponseMainInterestingCompany> mainInterestingCompanies = companyByUser.stream()
                .map(ResponseMainInterestingCompany::from)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        List<ResponseMainResume> mainResumes = mainInfos.stream()
                .sorted(Comparator.comparing(History::getUpdatedAt).reversed())
                .map(ResponseMainResume::from)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        mainResumes = mainResumes.size() >= 3 ? mainResumes.subList(0,3) : mainResumes;

        List<ResponseMainInterview> mainInterviews = mainInfos.stream()
                .sorted(Comparator.comparing(History::getUpdatedAt).reversed())
                .filter(info -> info.getInterview() != null && info.getInterview().getPrediction() != null)
                .flatMap(info -> info.getInterview().getPrediction().stream()
                        .map(prediction -> ResponseMainInterview.from(info, prediction)))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        mainInterviews = mainInterviews.size() >= 3 ? mainInterviews.subList(0,3) : mainInterviews;

        return ResponseMain.from(user, mainInterestingCompanies, mainResumes, mainInterviews);
    }
}
