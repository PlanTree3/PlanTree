package com.plantree.commonservice.global.infra;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploader {

    boolean upload(String fileUrl, MultipartFile multipartFile);
}
