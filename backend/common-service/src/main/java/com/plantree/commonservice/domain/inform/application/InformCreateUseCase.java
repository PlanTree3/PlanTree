package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.domain.InformFile;
import com.plantree.commonservice.domain.inform.dto.InformCreateRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformCreateResponseDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.infra.FileUploader;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class InformCreateUseCase {

    private final String GROUP_FILE_URL = "group/inform/";
    private final String BUCKET_URL = "https://plantree-bucket.s3.ap-northeast-2.amazonaws.com/";
    private final String CDN_URL = "https://d1d4ftwrlh987p.cloudfront.net/";

    private final FileUploader fileUploader;
    private final InformRepository informRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public InformCreateResponseDto createInform(UUID groupId, AuthMember authMember,
            InformCreateRequestDto informCreateRequestDto) {
        authMemberValidator.isGroupLeader(groupId, authMember);
        List<InformFile> informFiles = uploadFiles(informCreateRequestDto.getFiles(), groupId);
        Inform inform = Inform.builder()
                              .title(informCreateRequestDto.getTitle())
                              .content(informCreateRequestDto.getContent())
                              .groupId(groupId)
                              .teacherId(authMember.getMemberId())
                              .informFiles(informFiles)
                              .build();
        return new InformCreateResponseDto(informRepository.save(inform)
                                                           .getId());
    }

    private List<InformFile> uploadFiles(List<MultipartFile> files, UUID groupId) {
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
