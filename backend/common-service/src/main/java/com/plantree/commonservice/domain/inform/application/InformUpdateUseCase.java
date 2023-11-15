package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.domain.InformFile;
import com.plantree.commonservice.domain.inform.dto.InformFileAddRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformUpdateRequestDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.ResourceNotFoundException;
import com.plantree.commonservice.global.infra.FileUploader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class InformUpdateUseCase {

    private final String GROUP_FILE_URL = "group/inform/";
    private final String BUCKET_URL = "https://plantree-bucket.s3.ap-northeast-2.amazonaws.com/";

    private final InformRepository informRepository;
    private final FileUploader fileUploader;

    @Transactional
    public void updateInform(UUID informId, AuthMember authMember,
            InformUpdateRequestDto informUpdateRequestDto) {
        Inform inform = informRepository.findById(informId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "가정통신문을 찾을 수 없습니다."));
        inform.validateTeacher(authMember.getMemberId());
        inform.changeTitle(informUpdateRequestDto.getTitle());
        inform.changeContent(informUpdateRequestDto.getContent());
    }

    @Transactional
    public void addInformFile(UUID informId, AuthMember authMember,
            InformFileAddRequestDto informFileAddRequestDto) {
        Inform inform = informRepository.findByIdWithFiles(informId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "가정통신문을 찾을 수 없습니다."));
        inform.validateTeacher(authMember.getMemberId());
        InformFile file = uploadFile(informFileAddRequestDto.getFile(), inform.getGroupId());
        inform.addInformFile(file);
    }

    @Transactional
    public void deleteInformFile(UUID informId, UUID fileId, AuthMember authMember) {
        Inform inform = informRepository.findByIdWithFiles(informId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "가정통신문을 찾을 수 없습니다."));
        inform.validateTeacher(authMember.getMemberId());
        inform.deleteInformFile(fileId);
    }

    private InformFile uploadFile(MultipartFile file, UUID groupId) {
        if (file == null) {
            return null;
        }
        String today = LocalDate.now()
                                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String fileName = file.getOriginalFilename();
        String uploadFileUrl = GROUP_FILE_URL + groupId + "/" + today + "/" + fileName;
        String fileUrl = BUCKET_URL + GROUP_FILE_URL + groupId + "/" + today + "/" + fileName;
        fileUploader.upload(uploadFileUrl, file);
        return InformFile.builder()
                         .fileName(fileName)
                         .fileUrl(fileUrl)
                         .build();
    }
}
