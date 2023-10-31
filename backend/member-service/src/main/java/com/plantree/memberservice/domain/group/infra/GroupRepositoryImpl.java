package com.plantree.memberservice.domain.group.infra;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.infra.jpa.GroupJpaRepository;
import com.plantree.memberservice.domain.group.infra.query.GroupQueryRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository {

    private final GroupJpaRepository groupJpaRepository;
    private final GroupQueryRepository groupQueryRepository;

    @Override
    public Group save(Group group) {
        return groupJpaRepository.save(group);
    }

    @Override
    public Group findByIdWithTeacher(UUID groupId) {
        return groupQueryRepository.findByIdWithTeacher(groupId);
    }

    @Override
    public Optional<Group> findById(UUID groupId) {
        return groupJpaRepository.findById(groupId);
    }

    @Override
    public Group findByIdWithGroupStudents(UUID groupId) {
        return groupQueryRepository.findByIdWithGroupStudents(groupId);
    }
}
