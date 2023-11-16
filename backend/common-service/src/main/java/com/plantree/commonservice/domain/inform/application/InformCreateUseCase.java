package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.domain.InformFile;
import com.plantree.commonservice.domain.inform.domain.InformFileUploader;
import com.plantree.commonservice.domain.inform.dto.InformCreateRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformCreateResponseDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InformCreateUseCase {

    private final InformRepository informRepository;
    private final AuthMemberValidator authMemberValidator;
    private final InformFileUploader informFileUploader;

    @Transactional
    public InformCreateResponseDto createInform(UUID groupId, AuthMember authMember,
            InformCreateRequestDto informCreateRequestDto) {
        authMemberValidator.isGroupLeader(groupId, authMember);
        List<InformFile> informFiles = informFileUploader.uploadFiles(
                informCreateRequestDto.getFiles(), groupId);
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
}
