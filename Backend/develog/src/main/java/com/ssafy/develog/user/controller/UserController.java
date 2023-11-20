package com.ssafy.develog.user.controller;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.security.RedirectUrlProperties;
import com.ssafy.develog.security.jwt.JwtTokenProvider;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.dto.LoginDto;
import com.ssafy.develog.user.dto.request.RequestLoginDto;
import com.ssafy.develog.user.dto.response.ResponseLoginDto;
import com.ssafy.develog.user.dto.response.ResponseMain;
import com.ssafy.develog.user.dto.response.ResponseUserInfoDto;
import com.ssafy.develog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    // 카카오 로그인 및 회원가입
    @PostMapping("/login/kakao")
    public ResultTemplate login(@RequestBody RequestLoginDto requestLoginDto) {

        LoginDto user = userService.findKakaoUserByAuthorizedCode(requestLoginDto.getCode(), RedirectUrlProperties.KAKAO_REDIRECT_URL);
        String accessToken = jwtTokenProvider.createAccessToken(user.getUserId(), String.valueOf(user.getUserId()), user.getSocialType());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUserId());

        // 리프레시토큰 레디스에 저장한다
        jwtTokenProvider.storeRefreshToken(user.getUserId(), refreshToken);

        ResponseLoginDto responseLoginDto = ResponseLoginDto.builder()
                .userId(user.getUserId())
                .name(user.getNickname())
                .AccessToken(accessToken)
                .RefreshToken(refreshToken)
                .build();

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseLoginDto)
                .build();
    }

    // 회원 탈퇴
    @PatchMapping("/activate")
    public ResultTemplate deactivate(HttpServletRequest httpServletRequest,
                                     @RequestParam String isActivate) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        userService.deactivateUser(user.getUserId(), isActivate);

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data("success")
                .build();
    }

    /**
     *
     * @param httpServletRequest : 액세스 토큰
     * @return : 유저 정보
     */
    @GetMapping("/info")
    public ResultTemplate viewInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        ResponseUserInfoDto responseUserInfoDto = userService.viewInfo(user.getUserId());

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseUserInfoDto)
                .build();
    }

    @GetMapping("/main")
    public ResultTemplate viewMain(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        User user = userService.findUserByJwtToken(token);

        ResponseMain responseMain = userService.viewMain(user);

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(responseMain)
                .build();
    }
}
