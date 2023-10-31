package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.Optional;
import java.util.UUID;

public interface GroupRepository {

    Group save(Group group);

    Optional<Group> findById(UUID groupId);

    Group findByIdWithGroupStudents(UUID groupId);

    Group findByIdWithTeacher(UUID groupId);
}
