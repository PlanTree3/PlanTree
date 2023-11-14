package com.plantree.commonservice.global.infra;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploader {

    void upload(String fileUrl, MultipartFile multipartFile);
}
