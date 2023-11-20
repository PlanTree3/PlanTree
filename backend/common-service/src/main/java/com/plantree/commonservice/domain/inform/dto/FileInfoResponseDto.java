package com.plantree.commonservice.domain.inform.dto;

import com.plantree.commonservice.domain.inform.domain.InformFile;
import java.util.UUID;
import lombok.Getter;

@Getter
public class FileInfoResponseDto {

    private UUID fileId;
    private String fileName;

    public FileInfoResponseDto(InformFile informFile) {
        this.fileId = informFile.getId();
        this.fileName = informFile.getFileName();
    }
}
