package com.ssafy.develog.user.dto.response;

import com.ssafy.develog.user.dto.SchoolDto;
import lombok.Builder;
import lombok.Data;
import java.util.List;


@Data
@Builder
public class ResponseSchoolDto {

    private List<SchoolDto> HIGH;
    private List<SchoolDto> UNI;
    private List<SchoolDto> GRAD;

}
