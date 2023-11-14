package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.dto.InformDetailResponseDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.ResourceNotFoundException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.openFeign.dto.MemberNameResDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InformSearchUseCase {

    private final InformRepository informRepository;
    private final MemberServiceClient memberServiceClient;

    public InformDetailResponseDto searchInformDetail(UUID informId, AuthMember authMember) {
        Inform inform = informRepository.findByIdWithFiles(informId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "가정통신문을 찾을 수 없습니다."));
        MemberNameResDto writerName = memberServiceClient.getMemberName(inform.getTeacherId());
        return InformDetailResponseDto.builder()
                                      .title(inform.getTitle())
                                      .writer(writerName.getName())
                                      .content(inform.getContent())
                                      .informFiles(inform.getInformFiles())
                                      .build();
    }

}
