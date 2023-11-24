package com.plantree.forestservice.global.openFeign;

import com.plantree.forestservice.global.infra.RedisRepository;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherResDto;
import java.time.Duration;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceClient {

    private final RedisRepository redisRepository;
    private final MemberServiceClient memberServiceClient;

    public CheckGroupLeaderResDto checkGroupLeader(CheckGroupLeaderReqDto checkGroupLeaderReqDto, UUID groupId) {
        String key = groupId + ":" + checkGroupLeaderReqDto.getTeacherId();
        CheckGroupLeaderResDto dto = redisRepository.getValue(key)
                                                    .map(val -> new CheckGroupLeaderResDto((boolean) val))
                                                    .orElseGet(() -> memberServiceClient.checkGroupLeader(
                                                            checkGroupLeaderReqDto, groupId));
        redisRepository.setValue(key, dto.isTeacher(), Duration.ofMinutes(1));
        return dto;
    }

    public CheckTeacherResDto checkTeacher(CheckTeacherReqDto checkTeacherReqDto) {
        String key = checkTeacherReqDto.getStudentId() + ":" + checkTeacherReqDto.getTeacherId();
        CheckTeacherResDto dto = redisRepository.getValue(key)
                                                .map(val -> new CheckTeacherResDto((boolean) val))
                                                .orElseGet(() -> memberServiceClient.checkTeacher(checkTeacherReqDto));
        redisRepository.setValue(key, dto.isTeacher(), Duration.ofMinutes(1));
        return dto;
    }

    public CheckNestParentResDto checkNestParent(CheckNestParentReqDto checkNestParentReqDto) {
        String key = checkNestParentReqDto.getStudentId() + ":" + checkNestParentReqDto.getParentId();
        CheckNestParentResDto dto = redisRepository.getValue(key)
                                                   .map(val -> new CheckNestParentResDto((boolean) val))
                                                   .orElseGet(() -> memberServiceClient.checkNestParent(
                                                           checkNestParentReqDto));
        redisRepository.setValue(key, dto.isParent(), Duration.ofMinutes(1));
        return dto;
    }
}
