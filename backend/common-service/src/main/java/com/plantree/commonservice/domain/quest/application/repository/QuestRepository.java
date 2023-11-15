package com.plantree.commonservice.domain.quest.application.repository;


import com.plantree.commonservice.domain.quest.domain.Quest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestRepository {

    Optional<Quest> findById(UUID questId);

    void deleteById(UUID questId);

    Quest save(Quest quest);

    List<Quest> saveAll(List<Quest> quests);
}
