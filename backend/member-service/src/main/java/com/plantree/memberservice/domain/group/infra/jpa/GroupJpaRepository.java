package com.plantree.memberservice.domain.group.infra.jpa;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface GroupJpaRepository extends JpaRepository<Group, UUID> {

}
