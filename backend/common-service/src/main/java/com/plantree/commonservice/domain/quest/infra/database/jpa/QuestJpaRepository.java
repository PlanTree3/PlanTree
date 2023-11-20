package com.plantree.commonservice.domain.quest.infra.database.jpa;

import com.plantree.commonservice.domain.quest.domain.Quest;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestJpaRepository extends JpaRepository<Quest, UUID> {

}
