package com.plantree.forestservice.domain.commons.application;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.domain.commons.dto.BudCountListResponseDto;
import com.plantree.forestservice.domain.commons.dto.BudCountResponseDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommonBudCountUseCase {

    private final BudRepository budRepository;

    public BudCountListResponseDto findBudCountByStudentIds(List<UUID> studentIds) {
        List<Bud> budsFromStudentIds = budRepository.findCurrentBudsByMemberIds(studentIds);
        List<BudCountResponseDto> budCountResponseDtos = new ArrayList<>();

        Map<UUID, List<Bud>> groupBudsByStudentId = budsFromStudentIds.stream()
                .collect(Collectors.groupingBy(Bud::getStudentId));
        groupBudsByStudentId.forEach((studentId, buds) -> {
            budCountResponseDtos.add(new BudCountResponseDto(studentId, buds));
        });

        return new BudCountListResponseDto(budCountResponseDtos);

    }
}
