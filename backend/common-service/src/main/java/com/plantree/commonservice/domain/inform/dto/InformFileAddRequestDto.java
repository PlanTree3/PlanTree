package com.plantree.commonservice.domain.inform.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class InformFileAddRequestDto {

    private MultipartFile file;
}
