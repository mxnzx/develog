package com.ssafy.develog.interview.dto.request;

import com.ssafy.develog.common.domain.VoiceCheckType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestVoiceAnalysis {
    private Long voiceId;
    private String voiceText;
    private int voiceSecond;
    private VoiceCheckType voiceCheckType;
    private ArrayList<String> containsKeyword;
    private ArrayList<String> unContainsKeyword;
}
