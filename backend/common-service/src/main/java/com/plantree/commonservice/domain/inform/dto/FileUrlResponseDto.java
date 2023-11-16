package com.plantree.commonservice.domain.inform.dto;

import com.plantree.commonservice.domain.inform.domain.InformFile;
import lombok.Getter;

@Getter
public class FileUrlResponseDto {

    private String fileUrl;

    public FileUrlResponseDto(InformFile file) {
        this.fileUrl = file == null ? null : file.getFileUrl();
    }
}
