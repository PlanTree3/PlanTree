package com.plantree.forestservice.domain.forest.application;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.forest.dto.ForestListResDto;
import com.plantree.forestservice.domain.forest.dto.ForestResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
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

    public ForestListResDto findForests(UUID memberId, AuthMember authMember) {
        List<Forest> forests = forestRepository.findForestsByMemberId((memberId));

        return new ForestListResDto(
                forests.stream().map(ForestResDto::new).collect(Collectors.toList()));

    }
}
