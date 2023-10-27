package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.global.entity.BaseTimeEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "ROLE", discriminatorType = DiscriminatorType.STRING)
public class Member extends BaseTimeEntity {

    @Id
    @Column(name = "member_id")
    private String id;

    @Enumerated(EnumType.STRING)
    @Column
    private OauthProvider oauthProvider;

    @Column
    private String oauthId;

    @Column
    private String name;

    @Column
    private String profileImageUrl;

    @Column
    private LocalDate birthDate;

    @Column
    private String email;

    @Column
    private String refreshToken;

    @Builder
    public Member(OauthProvider oauthProvider, String oauthId, String name, String profileImageUrl,
            LocalDate birthDate, String email) {
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.birthDate = birthDate;
        this.email = email;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
