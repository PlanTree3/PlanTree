package com.plantree.commonservice.domain.inform.infra.database.jpa;

import com.plantree.commonservice.domain.inform.domain.Inform;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformJpaRepository extends JpaRepository<Inform, UUID> {

    List<Inform> findByGroupId(UUID groupId);
}
