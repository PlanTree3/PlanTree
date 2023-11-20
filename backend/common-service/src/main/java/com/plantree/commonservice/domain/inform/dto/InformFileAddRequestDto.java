package com.plantree.commonservice.domain.inform.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class InformFileAddRequestDto {

    private List<MultipartFile> files;
}
