package com.ssafy.develog.interview.service;


import com.ssafy.develog.common.exception.NotFoundException;
import com.ssafy.develog.interview.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;

    @Transactional
    public void deleteExamFile(Long recordId) {

        recordRepository.findById(recordId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.RECORD_NOT_FOUND));

        recordRepository.deleteById(recordId);
    }
}
