package com.plantree.commonservice.global.webmvc;

import java.util.UUID;
import lombok.Getter;

@Getter
public class AuthMember {

    private final UUID memberId;
    private final Role role;

    public AuthMember(UUID memberId, Role role) {
        this.memberId = memberId;
        this.role = role;
    }

}
