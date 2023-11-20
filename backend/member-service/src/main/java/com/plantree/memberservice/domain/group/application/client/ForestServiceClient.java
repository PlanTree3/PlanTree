package com.plantree.memberservice.domain.group.application.client;

import com.plantree.memberservice.domain.auth.dto.client.TreeCreateRequestDto;
import com.plantree.memberservice.domain.group.dto.StudentTreeRequestDto;
import com.plantree.memberservice.domain.group.dto.StudentTreeResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountListResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "forest-service")
public interface ForestServiceClient {

    @PostMapping("/commons/progress")
    BudCountListResponseDto getBudCounts(@RequestBody BudCountRequestDto budCountRequestDto);

    @PostMapping("/commons/signup")
    void createTree(@RequestBody TreeCreateRequestDto treeCreateRequestDto);

    @PostMapping("/tree/student-tree")
    StudentTreeResponseDto searchCurrentTreeIds(
            @RequestBody StudentTreeRequestDto studentTreeRequestDto);
}
