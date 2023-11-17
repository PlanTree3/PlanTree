package com.plantree.commonservice.domain.inform.domain;

import com.plantree.commonservice.global.infra.FileUploader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class InformFileUploader {

    private final String GROUP_FILE_URL = "group/inform/";
    private final String BUCKET_URL = "https://plantree-bucket.s3.ap-northeast-2.amazonaws.com/";
    private final String CDN_URL = "https://d1d4ftwrlh987p.cloudfront.net/";
    private final FileUploader fileUploader;

    public List<InformFile> uploadFiles(List<MultipartFile> files, UUID groupId) {
        List<InformFile> informFiles = new ArrayList<>();
        if (files == null) {
            return informFiles;
        }
        String today = LocalDate.now()
                                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            String uploadFileUrl = GROUP_FILE_URL + groupId + "/" + today + "/" + fileName;
            String fileUrl = BUCKET_URL + GROUP_FILE_URL + groupId + "/" + today + "/" + fileName;
            String cdnUrl = CDN_URL + GROUP_FILE_URL + groupId + "/" + today + "/" + fileName;
            if (fileUploader.upload(uploadFileUrl, file)) {
                informFiles.add(InformFile.builder()
                                          .fileName(fileName)
                                          .fileUrl(cdnUrl)
                                          .build());
            }
        }
        return informFiles;
    }
}
