package com.plantree.memberservice.domain.member.infra.jpa;

import com.plantree.memberservice.domain.member.domain.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentJpaRepository extends JpaRepository<Parent, Long> {

}
