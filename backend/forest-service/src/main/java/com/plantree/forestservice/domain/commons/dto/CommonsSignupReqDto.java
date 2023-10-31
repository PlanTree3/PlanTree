package com.plantree.forestservice.domain.commons.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsSignupReqDto {

    private UUID memberId;
    private Long studentId;

}
