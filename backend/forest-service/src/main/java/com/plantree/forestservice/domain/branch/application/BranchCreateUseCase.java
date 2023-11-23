package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.BranchCreatedByParentEvent;
import com.plantree.forestservice.global.event.BranchCreatedByStudentEvent;
import com.plantree.forestservice.global.event.BranchCreatedByTeacherEvent;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.event.ForestEvent;
import com.plantree.forestservice.global.event.ForestEventDetail;
import com.plantree.forestservice.global.event.ForestEventType;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
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
        produceBranchCreatedEvent(authMember, branch);
        return branch;
    }

    @Transactional
    public void createBranchesToAllGroupMembers(UUID groupId, AuthMember authMember, String name) {
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

    private void produceBranchCreatedEvent(AuthMember authMember, Branch branch) {
        ForestEventDetail detail;
        ForestEventType type;
        switch (authMember.getRole()) {
            case STUDENT:
                detail = BranchCreatedByStudentEvent.builder()
                                                    .studentId(branch.getStudentId())
                                                    .branchId(branch.getId())
                                                    .branchName(branch.getName())
                                                    .build();
                type = ForestEventType.STU_GEN_BRA;
                break;
            case PARENT:
                detail = BranchCreatedByParentEvent.builder()
                                                   .studentId(branch.getStudentId())
                                                   .parentId(authMember.getMemberId())
                                                   .branchId(branch.getId())
                                                   .branchName(branch.getName())
                                                   .build();
                type = ForestEventType.PAR_GEN_BRA;
                break;
            case TEACHER:
                detail = BranchCreatedByTeacherEvent.builder()
                                                    .studentId(branch.getStudentId())
                                                    .teacherId(authMember.getMemberId())
                                                    .branchId(branch.getId())
                                                    .branchName(branch.getName())
                                                    .build();
                type = ForestEventType.TEA_GEN_BRA;
                break;
            default:
                throw new UnauthorizedAccessException();
        }
        ForestEvent event = ForestEvent.builder()
                                       .treeId(branch.getTree()
                                                     .getId())
                                       .type(type)
                                       .detail(detail)
                                       .build();
        EventProducer.send(event);
    }
}
