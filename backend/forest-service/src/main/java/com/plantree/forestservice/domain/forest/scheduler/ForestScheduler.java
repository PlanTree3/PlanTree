package com.plantree.forestservice.domain.forest.scheduler;


import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ForestScheduler {

    private final MemberServiceClient memberServiceClient;
    private final ForestRepository forestRepository;

    @Transactional
    @Scheduled(cron = "0 0 0 ? 3 2#1")
    public void addForestsToAllMembers() {
        LocalDate endedAt = Forest.calculateEndDate(LocalDate.now()
                                                             .plusMonths(1));
        List<UUID> studentIds = memberServiceClient.getAllStudentIds()
                                                   .getStudentIds();
        List<Forest> forests = studentIds.stream()
                                         .map(studentId -> new Forest(studentId, endedAt))
                                         .collect(
                                                 Collectors.toList());
        forestRepository.saveAll(forests);
    }

}
