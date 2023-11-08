package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GroupRepository {

    Group save(Group group);

    Optional<Group> findById(UUID groupId);

    Optional<Group> findByIdWithTeacher(UUID groupId);

    Optional<Group> findByIdWithStudents(UUID groupId);

    Optional<Group> findByIdWithGroupStudents(UUID groupId);

    Optional<Group> findByIdWithTeacherAndStudents(UUID groupId);

    List<Group> findTeacherGroupsByMemberId(UUID memberId);

    void delete(Group group);
}
