package com.plantree.memberservice.domain.auth.dto.request;

import com.plantree.memberservice.domain.member.domain.OauthProvider;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    private String idToken;
    private OauthProvider oauthProvider;
    private String name;
    private LocalDate birthDate;
    private String role;
    private String profileImageUrl;
}
