package com.plantree.memberservice.domain.auth.dto.request;

import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.domain.member.domain.Role;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    private String idToken;
    private OauthProvider oauthProvider;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private Role role;
    private String profileImageUrl;
}
