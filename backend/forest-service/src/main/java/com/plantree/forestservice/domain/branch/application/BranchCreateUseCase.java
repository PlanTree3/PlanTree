package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchCreateReqDto;
import com.plantree.forestservice.domain.branch.dto.BranchCreateResDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.GetGroupMembersResDto;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BranchCreateUseCase {

    private final BranchRepository branchRepository;
    private final TreeRepository treeRepository;
    private final AuthMemberValidator authMemberValidator;
    private final MemberServiceClient memberServiceClient;

    @Transactional
    public BranchCreateResDto createBranch(UUID treeId, AuthMember authMember,
            String name) {

        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
        authMemberValidator.validateAuthMember(tree.getStudentId(), authMember);

        Branch branch = branchRepository.save(Branch.builder()
                .name(name)
                .issuerId(authMember.getMemberId())
                .studentId(tree.getStudentId())
                .build());

        return BranchCreateResDto.builder()
                .branchId(branch.getId())
                .branchColor(branch.getColor())
                .build();
    }

    @Transactional
    public void createBranchesToAllGroupMembers(Long groupId, AuthMember authMember, String name) {

        authMemberValidator.isGroupLeader(groupId, authMember);
        List<UUID> studentIds = memberServiceClient.getGroupMembers(groupId).getStudentIds();

        //todo 현재 트리를 가져와서 가지를 하나씩 추가해주는 로직
//        studentIds.stream().map(studentId -> {
//
//        });



    }
}
