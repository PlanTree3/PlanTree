package com.plantree.forestservice.domain.forest.application;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.forest.dto.ForestListResDto;
import com.plantree.forestservice.domain.forest.dto.ForestResDto;
import com.plantree.forestservice.domain.forest.dto.TreeFromForestResDto;
import com.plantree.forestservice.domain.forest.dto.TreeListFromForestResDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ForestSearchUseCase {

    private final ForestRepository forestRepository;
    private final TreeRepository treeRepository;

    public ForestListResDto findOthersForests(UUID memberId, AuthMember authMember) {
        List<Forest> forests = forestRepository.findForestsByMemberId((memberId));

        return new ForestListResDto(
                forests.stream()
                       .map(ForestResDto::new)
                       .collect(Collectors.toList()));

    }

    public ForestListResDto findMyForests(AuthMember authMember) {
        List<Forest> forests = forestRepository.findForestsByMemberId((authMember.getMemberId()));

        return new ForestListResDto(
                forests.stream()
                       .map(ForestResDto::new)
                       .collect(Collectors.toList()));

    }

    public TreeListFromForestResDto findTreesByForestIdAndPeriod(UUID forestId, LocalDate startedAt,
            LocalDate endedAt) {

        List<Tree> trees = treeRepository.findTreesByForestIdAndPeriod(forestId, startedAt,
                endedAt);
        return new TreeListFromForestResDto(
                trees.stream()
                     .map(tree -> new TreeFromForestResDto(tree))
                     .collect(
                             Collectors.toList()));

    }
}
