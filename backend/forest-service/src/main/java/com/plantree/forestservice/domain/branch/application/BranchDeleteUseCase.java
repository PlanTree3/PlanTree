package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BranchDeleteUseCase {

    private final BranchRepository branchRepository;
    private final TreeRepository treeRepository;
    private final AuthMemberValidator authMemberValidator;


    public void dropBranch(UUID treeId, UUID branchId, AuthMember authMember) {

        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
        authMemberValidator.validateAuthMember(tree.getStudentId(), authMember);

        branchRepository.deleteById(branchId);

    }
}
