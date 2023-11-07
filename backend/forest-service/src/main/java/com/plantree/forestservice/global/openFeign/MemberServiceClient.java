package com.plantree.forestservice.global.openFeign;

import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentResDto;
import com.plantree.forestservice.global.openFeign.dto.GetGroupMembersResDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdReqDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdResDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/group/{groupId}/student-id")
    public GetGroupMembersResDto getGroupMembers(@PathVariable Long groupId);

    @GetMapping("/group/student/check-leader")
    public CheckTeacherResDto checkTeacher(@RequestBody CheckTeacherReqDto checkTeacherReqDto);

    @GetMapping("/student/check-parent")
    public CheckNestParentResDto checkNestParent(
            @RequestBody CheckNestParentReqDto checkNestParentReqDto);

    @GetMapping("/group/{groupId}/check-leader")
    public CheckGroupLeaderResDto checkGroupLeader(
            @RequestBody CheckGroupLeaderReqDto checkGroupLeaderReqDto);

    @GetMapping("/member/name")
    public GetNamesFromMemberIdResDto getNamesFromMember(
            @RequestBody GetNamesFromMemberIdReqDto getNamesFromMemberIdReqDto);
}
