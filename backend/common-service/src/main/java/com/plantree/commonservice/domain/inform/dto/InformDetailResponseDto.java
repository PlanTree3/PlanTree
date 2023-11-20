package com.plantree.commonservice.domain.inform.dto;

import com.plantree.commonservice.domain.inform.domain.InformFile;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
public class InformDetailResponseDto {

    private String title;
    private String writer;
    private String content;
    private List<FileInfoResponseDto> files;

    @Builder
    public InformDetailResponseDto(String title, String writer, String content,
            List<InformFile> informFiles) {
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.files = informFiles.stream()
                                .map(FileInfoResponseDto::new)
                                .collect(Collectors.toList());
    }
}
