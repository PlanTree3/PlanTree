package com.plantree.forestservice.global.config.webmvc;

import java.util.UUID;
import lombok.Getter;

@Getter
public class AuthMember {

    private final UUID memberId;

    public AuthMember(UUID memberId) {
        this.memberId = memberId;
    }

}
