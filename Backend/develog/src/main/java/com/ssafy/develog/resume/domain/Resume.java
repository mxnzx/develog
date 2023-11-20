package com.ssafy.develog.resume.domain;

import com.ssafy.develog.common.domain.BaseCheckType;
import com.ssafy.develog.common.domain.BaseTimeEntity;
import com.ssafy.develog.company.domain.History;
import com.ssafy.develog.interview.domain.Voice;
import com.ssafy.develog.resume.dto.request.RequestAddResume;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Resume extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeId;

    private LocalDateTime deadlineAt;

    @Enumerated(EnumType.STRING)
    private BaseCheckType isStore;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResumeDetail> resumeDetails;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<History> histories = new ArrayList<>();

    public static Resume makeResume(History history, RequestAddResume requestAddResume){

        Resume resume = new Resume();
        resume.deadlineAt = requestAddResume.getDeadlineAt();
        resume.histories.add(history);
        resume.isStore = BaseCheckType.F;

        return resume;
    }
    @Override
    public void updateTime() {
        super.updateTime();
        for (History history : this.histories) {
            history.updateTime();
        }
    }

    public void updateIsStore(BaseCheckType baseCheckType){
        this.isStore = baseCheckType;
    }

}
