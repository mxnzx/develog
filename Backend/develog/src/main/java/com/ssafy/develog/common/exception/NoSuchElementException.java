package com.ssafy.develog.common.exception;

public class NoSuchElementException extends java.util.NoSuchElementException {
    public static final String NO_SUCH_RESUME = "해당 자소서가 존재하지 않습니다.";
    public NoSuchElementException(String message) {
        super(message);
    }
}
