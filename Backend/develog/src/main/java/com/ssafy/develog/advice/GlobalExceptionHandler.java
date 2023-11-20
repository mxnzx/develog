package com.ssafy.develog.advice;

import com.ssafy.develog.common.domain.ResultTemplate;
import com.ssafy.develog.common.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler( {NotFoundException.class} )
    public ResultTemplate handleBadRequestExceptions(Exception e){
        return ResultTemplate.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .data(e.getMessage())
                .build();
    }

}