package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.UUID;

public interface GroupRepository {

    Group save(Group group);

    Group findByIdWithTeacher(UUID groupId);
}
