package com.ssafy.develog.common.exception;

public class DuplicateException extends RuntimeException{

    public static final String COMPANY_ALREADY_REGISTER = "이미 관심 등록한 기업 입니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
