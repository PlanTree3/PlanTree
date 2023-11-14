package com.plantree.commonservice.domain.inform.infra.database.query;

import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.domain.QInform;
import com.plantree.commonservice.domain.inform.domain.QInformFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InformQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QInform inform = QInform.inform;
    private final QInformFile informFile = QInformFile.informFile;

    public Inform findByIdWithFiles(UUID informId) {
        return jpaQueryFactory.selectFrom(inform)
                              .leftJoin(inform.informFiles, informFile)
                              .fetchJoin()
                              .where(inform.id.eq(informId))
                              .fetchOne();
    }

}
