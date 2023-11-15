package com.plantree.commonservice.domain.inform.dto;

import com.plantree.commonservice.domain.inform.domain.Inform;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GroupInformListResponseDto {

    private List<GroupInformResponseDto> informs;

    public GroupInformListResponseDto(List<Inform> informs) {
        this.informs = informs.stream()
                              .map(GroupInformResponseDto::new)
                              .collect(Collectors.toList());
    }
}
