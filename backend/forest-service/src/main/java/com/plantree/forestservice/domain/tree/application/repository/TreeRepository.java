package com.plantree.forestservice.domain.tree.application.repository;

import com.plantree.forestservice.domain.tree.domain.Tree;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TreeRepository {
    Tree save(Tree tree);
    Optional<Tree> findById(UUID id);

    Optional<Tree> findCurrentTreeByMemberId(UUID memberId);

    List<Tree> findTreesByForestIdAndPeriod(UUID forestId, LocalDate startedAt,
            LocalDate endedAt);

    List<Tree> findTreesByStudentIds(List<UUID> studentIds);
}
