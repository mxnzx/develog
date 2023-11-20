package com.ssafy.develog.common.exception;

public class NotFoundException extends RuntimeException {
    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String COMPANY_NOT_FOUND = "존재하지 않는 기업입니다.";
    public static final String HEADER_NOT_FOUND = "헤더 내용이 없습니다.";
    public static final String COMPANY_INFO_NOT_FOUND = "일치 하는 기업 정보가 없습니다.";
    public static final String INTERVIEW_NOT_FOUND = "해당 인터뷰가 존재하지 않습니다.";
    public static final String PREDICTION_NOT_FOUND = "해당 예상 질문이 존재하지 않습니다.";
    public static final String HISTORY_NOT_FOUND = "해당 기업에 대한 무언가가 없습니다.";
    public static final String RESUMEDETAIL_NOT_FOUND = "해당 자소서 문항이 존재하지 않습니다.";
    public static final String SCRIPTKEYWORD_NOT_FOUND = "해당 키워드가 존재하지 않습니다.";
    public static final String TAIL_NOT_FOUND = "해당 꼬리질문이 존재하지 않습니다.";
    public static final String VOICE_NOT_FOUND = "해당 음성파일이 존재하지 않습니다.";
    public static final String TAIL_KEYWORD_NOT_FOUND = "해당 꼬리질문의 키워드가 존재하지 않습니다.";
    public static final String RESUME_NOT_FOUND = "해당 자소서가 존재하지 않습니다.";
    public static final String RECORD_NOT_FOUND = "해당 실전면접이 존재하지 않습니다.";
    public static final String RECORD_DETAIL_NOT_FOUND = "실전면접 세부 내용이 존재하지 않습니다.";
    public static final String CATEGORY_NOT_FOUND = "해당 카테고리 키워드가 존재하지 않습니다.";
    public static final String USER_CATEGORY_RESUME_NOT_FOUND = "해당 사용자 카테고리 키워드가 존재하지 않습니다.";
    public static final String RECORD_RESULT_NOT_FOUND = "해당 모의면접 회차 결과가 존재하지 않습니다.";

    public NotFoundException(String message) {
        super(message);
    }
}