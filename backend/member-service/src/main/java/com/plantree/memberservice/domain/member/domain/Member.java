package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.global.entity.BaseTimeEntity;
import com.plantree.memberservice.global.exception.AuthenticationFailException;
import com.plantree.memberservice.global.util.SequentialUUIDGenerator;
import java.time.LocalDate;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class Member extends BaseTimeEntity {

    @Id
    @Column(name = "member_id", columnDefinition = "BINARY(16)")
    private UUID id;

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

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @Column
    private String refreshToken;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Student student;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Parent parent;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Teacher teacher;

    @Builder
    public Member(OauthProvider oauthProvider, String oauthId, String name, String profileImageUrl,
            LocalDate birthDate, String email, Role role) {
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.birthDate = birthDate;
        this.email = email;
        this.role = role;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public void checkEqualRefreshToken(String refreshToken) {
        if (!this.refreshToken.equals(refreshToken)) {
            throw new AuthenticationFailException("인증 정보가 일치하지 않습니다.");
        }
    }

    public void changeProfileImageUrl(String profileImageUrl) {
        if (this.parent != null) {
            this.parent.changeProfileImageUrl(name);
        }
        if (this.student != null) {
            this.student.changeProfileImageUrl(name);
        }
        if (this.teacher != null) {
            this.teacher.changeProfileImageUrl(name);
        }
        this.profileImageUrl = profileImageUrl;
    }

    public void changeName(String name) {
        if (this.parent != null) {
            this.parent.changeName(name);
        }
        if (this.student != null) {
            this.student.changeName(name);
        }
        if (this.teacher != null) {
            this.teacher.changeName(name);
        }
        this.name = name;
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
