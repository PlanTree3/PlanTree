package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Bud.BudCommentNotFoundException;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudCommentModifyUseCase {

    private final BudRepository budRepository;
    private final BudCommentRepository budCommentRepository;

    @Transactional
    public void updateComment(UUID treeId, UUID budId, Long commentId, String content,
            AuthMember authMember) {
        BudComment budComment = budCommentRepository.findById(commentId).orElseThrow(
                BudCommentNotFoundException::new);
        if (!budComment.getWriterId().equals(authMember.getMemberId())) {
            throw new UnauthorizedAccessException();
        }

        budComment.updateContent(content);
    }
}
