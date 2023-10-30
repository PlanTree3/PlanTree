package com.plantree.memberservice.global.config.webmvc;

import lombok.Getter;

@Getter
public class AuthMember {

    private final String memberId;

    public AuthMember(String memberId) {
        this.memberId = memberId;
    }

}
