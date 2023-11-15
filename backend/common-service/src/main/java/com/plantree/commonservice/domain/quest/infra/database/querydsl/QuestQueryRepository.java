package com.plantree.commonservice.domain.quest.infra.database.querydsl;

import com.plantree.commonservice.domain.quest.domain.QQuest;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QQuest quest = QQuest.quest;

    public List<Quest> findAllByAcceptorId(UUID acceptorId){
        return jpaQueryFactory.selectFrom(quest)
                .where(quest.acceptor.eq(acceptorId))
                .fetch();
    }


}
