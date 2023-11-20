package com.ssafy.develog.user.domain;

import com.ssafy.develog.user.dto.request.RequestLicenseDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long licenseId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;
    private String organization;
    private String serialNum;

    private LocalDateTime acquisitionDate;
    private LocalDateTime expireDate;

    public License(User user, String title, String organization, String serialNum, LocalDateTime acquisitionDate, LocalDateTime expireDate) {
        this.user = user;
        this.title = title;
        this.organization = organization;
        this.serialNum = serialNum;
        this.acquisitionDate = acquisitionDate;
        this.expireDate = expireDate;
    }

    public static License makeLicense(User user, RequestLicenseDto request) {

        License response = new License();
        response.user = user;
        response.title = request.getTitle();
        response.organization = request.getOrganization();
        response.serialNum = request.getSerialNum();
        response.acquisitionDate = request.getAcquisitionDate();
        response.expireDate = request.getExpireDate();

        return response;
    }
}
