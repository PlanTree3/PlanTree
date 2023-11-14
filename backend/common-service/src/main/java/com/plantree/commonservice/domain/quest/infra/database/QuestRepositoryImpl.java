package com.plantree.commonservice.domain.quest.infra.database;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.infra.database.jpa.QuestJpaRepository;
import com.plantree.commonservice.domain.quest.infra.database.querydsl.QuestQueryRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QuestRepositoryImpl implements QuestRepository {

    private final QuestJpaRepository questJpaRepository;
    private final QuestQueryRepository questQueryRepository;

    @Override
    public Optional<Quest> findById(UUID questId){
        return questJpaRepository.findById(questId);
    }

    @Override
    public void deleteById(UUID questId){
        questJpaRepository.deleteById(questId);
    }

    @Override
    public Quest save(Quest quest){
        return questJpaRepository.save(quest);
    }

}
