package com.plantree.memberservice.domain.member.infra;

import com.plantree.memberservice.domain.member.application.repository.ParentRepository;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.infra.jpa.ParentJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ParentRepositoryImpl implements ParentRepository {

    private final ParentJpaRepository parentJpaRepository;

    @Override
    public Parent save(Parent parent) {
        return parentJpaRepository.save(parent);
    }
}
