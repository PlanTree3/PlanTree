package com.plantree.forestservice.global.openFeign;

import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherResDto;
import com.plantree.forestservice.global.openFeign.dto.GetAllStudentIdsResDto;
import com.plantree.forestservice.global.openFeign.dto.GetGroupMembersResDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdReqDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdResDto;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @PostMapping("/group/{groupId}/student-id")
    GetGroupMembersResDto getGroupMembers(@PathVariable("groupId") UUID groupId);

    @PostMapping("/group/student/check-leader")
    CheckTeacherResDto checkTeacher(@RequestBody CheckTeacherReqDto checkTeacherReqDto);

    @PostMapping("/nest/check-parent")
    CheckNestParentResDto checkNestParent(
            @RequestBody CheckNestParentReqDto checkNestParentReqDto);

    @PostMapping("/group/{groupId}/check-leader")
    CheckGroupLeaderResDto checkGroupLeader(
            @RequestBody CheckGroupLeaderReqDto checkGroupLeaderReqDto, @PathVariable("groupId") UUID groupId);

    @PostMapping("/member/name")
    GetNamesFromMemberIdResDto getNamesFromMember(
            @RequestBody GetNamesFromMemberIdReqDto getNamesFromMemberIdReqDto);

    @GetMapping("/member/student-id")
    GetAllStudentIdsResDto getAllStudentIds();
}
