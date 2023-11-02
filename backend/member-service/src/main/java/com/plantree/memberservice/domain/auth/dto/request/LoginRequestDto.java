package com.plantree.memberservice.domain.auth.dto.request;

import com.plantree.memberservice.domain.member.domain.OauthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequestDto {

    private OauthProvider oauthProvider;
    private String idToken;

}
