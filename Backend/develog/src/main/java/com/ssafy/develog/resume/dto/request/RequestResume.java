package com.ssafy.develog.resume.dto.request;

import com.ssafy.develog.common.domain.BaseCheckType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestResume {

    private Long userId;
    private Long resumeId;
    private BaseCheckType isStore;
    private List<RequestResumeDetail> details;

}
