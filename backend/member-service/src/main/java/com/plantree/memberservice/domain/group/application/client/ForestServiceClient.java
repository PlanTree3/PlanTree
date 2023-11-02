package com.plantree.memberservice.domain.group.application.client;

import com.plantree.memberservice.domain.group.dto.client.BudCountListResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "forest-service")
public interface ForestServiceClient {

    @GetMapping("/commons/progress")
    BudCountListResponseDto getBudCounts(@RequestBody BudCountRequestDto budCountRequestDto);

}
