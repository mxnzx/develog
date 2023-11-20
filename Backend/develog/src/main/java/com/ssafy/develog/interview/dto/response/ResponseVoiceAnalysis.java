package com.ssafy.develog.interview.dto.response;

import com.ssafy.develog.interview.domain.Voice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseVoiceAnalysis {
    private String voiceUrl;
    private String voiceText;
    private int similarity;
    private int voiceSecond;

    public static ResponseVoiceAnalysis from(Voice voice) {

        ResponseVoiceAnalysis response = new ResponseVoiceAnalysis();

        response.voiceUrl = voice.getVoiceUrl();
        response.voiceText = voice.getVoiceText();
        response.similarity = voice.getSimilarity();
        response.voiceSecond = voice.getVoiceSecond();

        return response;
    }
}
