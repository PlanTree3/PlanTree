package com.plantree.forestservice.domain.tree.application;

import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.domain.tree.dto.TreeNameModfiyReqDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TreeModifyUseCase {

    private final TreeRepository treeRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void updateTreeName(UUID treeId, AuthMember authMember,
            String name) {

        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
        if (!tree.getStudentId().equals(authMember.getMemberId())) {
            throw new UnauthorizedAccessException();
        }

        tree.updateName(name);

    }
}
