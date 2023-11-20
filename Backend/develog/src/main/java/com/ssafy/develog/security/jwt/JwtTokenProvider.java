package com.ssafy.develog.security.jwt;

import com.ssafy.develog.user.domain.SocialType;
import com.ssafy.develog.user.domain.User;
import com.ssafy.develog.user.domain.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final UserDetailsService userDetailsService;

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenValidTime;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenValidTime;

    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(Long userId, String userPk, SocialType socialType) {

        // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣음
        Claims claims = Jwts.claims().setSubject(userPk);
        claims.put("id", userId);
        claims.put("socialType",socialType);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accessTokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
                .compact();
    }

    public String createRefreshToken(Long userId) {

        Date now = new Date();
        return Jwts.builder()
                .setId(Long.toString(userId)) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
                .compact();
    }

    public Authentication getAuthentication(String token) {
        log.info("여기 토큰 userId로 던짐!!:::: " + this.getUserPk(token));
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        log.info("JwtTokenProvider 클래스 들어옴. getAuthentication 메서드 실행 중");
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String getUserId(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getId();
    }

    // Request의 Header에서 accesstoken 값을 가져옴. "Authorization" : "ACCESSTOKEN값'
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Authorization"));

    }

    // Request의 Header에서 refreshtoken 값을 가져옴. "Authorization-Refresh" : "REFRESHTOKEN값'
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Authorization-Refresh"));

    }

    public void storeRefreshToken(long userId, String refreshToken) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            redisTemplate.opsForValue().set(
                    Long.toString(userId),
                    refreshToken,
                    refreshTokenValidTime,
                    TimeUnit.MILLISECONDS
            );
        }
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (SignatureException e) {
            log.warn("JWT 서명이 유효하지 않습니다.");
            throw new SignatureException("잘못된 JWT 시그니쳐");
        } catch (MalformedJwtException e) {
            log.warn("유효하지 않은 JWT 토큰입니다.");
            throw new MalformedJwtException("유효하지 않은 JWT 토큰");
        } catch (ExpiredJwtException e) {
            log.warn("만료된 JWT 토큰입니다.");
            throw new ExpiredJwtException(null, null, "토큰 기간 만료");
        } catch (UnsupportedJwtException e) {
            log.warn("지원되지 않는 JWT 토큰입니다.");
            throw new UnsupportedJwtException("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.warn("JWT claims string is empty.");
        } catch (NullPointerException e) {
            log.warn("JWT RefreshToken is empty");
        } catch (Exception e) {
            log.warn("잘못된 토큰입니다.");
        }
        return false;

    }
}
