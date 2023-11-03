package com.plantree.memberservice.domain.group.infra;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.infra.jpa.GroupJpaRepository;
import com.plantree.memberservice.domain.group.infra.query.GroupQueryRepository;
import java.util.List;
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
    public Optional<Group> findByIdWithTeacher(UUID groupId) {
        return Optional.ofNullable(groupQueryRepository.findByIdWithTeacher(groupId));
    }

    @Override
    public Optional<Group> findByIdWithStudents(UUID groupId) {
        return Optional.ofNullable(groupQueryRepository.findByIdWithStudents(groupId));
    }

    @Override
    public Optional<Group> findByIdWithTeacherAndStudents(UUID groupId) {
        return Optional.ofNullable(groupQueryRepository.findByIdWithTeacherAndStudents(groupId));
    }

    @Override
    public Optional<Group> findById(UUID groupId) {
        return groupJpaRepository.findById(groupId);
    }

    @Override
    public Optional<Group> findByIdWithGroupStudents(UUID groupId) {
        return Optional.ofNullable(groupQueryRepository.findByIdWithGroupStudents(groupId));
    }

    @Override
    public List<Group> findTeacherGroupsByMemberId(UUID memberId) {
        return groupQueryRepository.findTeacherGroupsByMemberId(memberId);
    }

    @Override
    public void delete(Group group) {
        groupJpaRepository.delete(group);
    }

}
