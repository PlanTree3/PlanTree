package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.domain.BranchCreatedEvent;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BranchCreateUseCase {

    private final BranchRepository branchRepository;
    private final TreeRepository treeRepository;
    private final AuthMemberValidator authMemberValidator;
    private final MemberServiceClient memberServiceClient;

    @Transactional
    public Branch createBranch(UUID treeId, AuthMember authMember,
            String name, String color) {

        Tree tree = treeRepository.findById(treeId)
                                  .orElseThrow(TreeNotFoundException::new);
        authMemberValidator.validateAuthMember(tree.getStudentId(), authMember);

        Branch branch = branchRepository.save(Branch.builder()
                                                    .name(name)
                                                    .tree(tree)
                                                    .color(color)
                                                    .issuerId(authMember.getMemberId())
                                                    .studentId(tree.getStudentId())
                                                    .build());
        BranchCreatedEvent event = BranchCreatedEvent.builder()
                                                     .treeId(treeId)
                                                     .memberId(authMember.getMemberId())
                                                     .role(authMember.getRole())
                                                     .branchId(branch.getId())
                                                     .branchName(branch.getName())
                                                     .build();
        EventProducer.send(event);
        return branch;
    }

    @Transactional
    public void createBranchesToAllGroupMembers(UUID groupId, AuthMember authMember, String name) {
        log.info("groupId : {}", groupId);
        log.info("Auth.memberId: {}", authMember.getMemberId());

        authMemberValidator.isGroupLeader(groupId, authMember);
        List<UUID> studentIds = memberServiceClient.getGroupMembers(groupId)
                                                   .getStudentIds();

        List<Tree> trees = treeRepository.findTreesByStudentIds(studentIds);

        List<Branch> branches = trees.stream()
                                     .map(tree -> Branch.builder()
                                                        .name(name)
                                                        .issuerId(authMember.getMemberId())
                                                        .studentId(tree.getStudentId())
                                                        .tree(tree)
                                                        .build())
                                     .collect(Collectors.toList());

        branchRepository.saveAll(branches);
    }
}
