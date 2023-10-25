package com.ssafy.develog.common.exception;

public class NotFoundException extends RuntimeException {
    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String COMPANY_LIST_NOT_FOUND = "관심기업 리스트가 없습니다.";

    public NotFoundException(String message) {
        super(message);
    }
}