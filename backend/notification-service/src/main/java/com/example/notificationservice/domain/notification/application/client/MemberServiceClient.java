package com.example.notificationservice.domain.notification.application.client;

import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.ParentIdsResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/member/{memberId}/name")
    MemberNameResponseDto getMemberName(@PathVariable(value = "memberId") UUID memberId);

    @GetMapping("/group/leader-id/{studentId}")
    TeacherAndParentIdsResponseDto getTeacherAndParentIds(
            @PathVariable(value = "studentId") UUID studentId);

    @GetMapping("/nest/leader-id/{studentId}")
    ParentIdsResponseDto getParentIds(@PathVariable(value = "studentId") UUID studentId);
}
