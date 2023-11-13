package com.plantree.forestservice.domain.tree.scheduler;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TreeScheduler {

    private final MemberServiceClient memberServiceClient;
    private final ForestRepository forestRepository;
    private final TreeRepository treeRepository;

    @Transactional
    @Scheduled(cron = "0 11 * * 7 *")
    public void addTreesToAllMembers() {
        LocalDate nextMonday = LocalDate.now()
                                        .with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        LocalDate nextSunday = LocalDate.now()
                                        .with(TemporalAdjusters.next(DayOfWeek.SUNDAY));

        List<UUID> studentIds = memberServiceClient.getAllStudentIds()
                                                   .getStudentIds();
        List<Forest> forests = forestRepository.findAllById(studentIds);
        List<Tree> trees = forests.stream()
                                  .map(forest -> new Tree(forest.getStudentId(), forest, nextMonday,
                                          nextSunday))
                                  .collect(Collectors.toList());
        treeRepository.saveAll(trees);
    }

}
