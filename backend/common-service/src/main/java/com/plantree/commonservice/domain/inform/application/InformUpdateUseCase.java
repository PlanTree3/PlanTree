package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.domain.InformFile;
import com.plantree.commonservice.domain.inform.domain.InformFileUploader;
import com.plantree.commonservice.domain.inform.dto.InformFileAddRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformUpdateRequestDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InformUpdateUseCase {


    private final InformRepository informRepository;
    private final InformFileUploader informFileUploader;

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
        List<InformFile> informFiles = informFileUploader.uploadFiles(
                informFileAddRequestDto.getFiles(),
                inform.getGroupId());
        inform.addInformFiles(informFiles);
    }

    @Transactional
    public void deleteInformFile(UUID informId, UUID fileId, AuthMember authMember) {
        Inform inform = informRepository.findByIdWithFiles(informId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "가정통신문을 찾을 수 없습니다."));
        inform.validateTeacher(authMember.getMemberId());
        inform.deleteInformFile(fileId);
    }


}
