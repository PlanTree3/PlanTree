package com.plantree.commonservice.domain.inform.application;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.dto.GroupInformListResponseDto;
import com.plantree.commonservice.domain.inform.dto.InformDetailResponseDto;
import com.plantree.commonservice.global.exception.ResourceNotFoundException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.openFeign.dto.MemberNameResDto;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InformSearchUseCase {

    private final InformRepository informRepository;
    private final MemberServiceClient memberServiceClient;

    @Transactional(readOnly = true)
    public InformDetailResponseDto searchInformDetail(UUID informId) {
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

    @Transactional(readOnly = true)
    public GroupInformListResponseDto searchGroupInforms(UUID groupId) {
        List<Inform> groupInforms = informRepository.findByGroupId(groupId);
        return new GroupInformListResponseDto(groupInforms);
    }

}
