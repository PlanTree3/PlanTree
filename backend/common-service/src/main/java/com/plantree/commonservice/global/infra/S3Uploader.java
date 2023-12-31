package com.plantree.commonservice.global.infra;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.plantree.commonservice.global.exception.S3UploadException;
import com.plantree.commonservice.global.property.S3Property;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class S3Uploader implements FileUploader {

    private final AmazonS3Client amazonS3Client;
    private final String bucket;

    public S3Uploader(AmazonS3Client amazonS3Client, S3Property s3Property) {
        this.amazonS3Client = amazonS3Client;
        this.bucket = s3Property.getBucket();
    }

    public boolean upload(String fileUrl, MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return false;
        }

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try {
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, fileUrl, multipartFile.getInputStream(),
                            objectMetadata));
        } catch (IOException e) {
            throw new S3UploadException("파일 업로드에 실패하였습니다.");
        }
        return true;
    }

}