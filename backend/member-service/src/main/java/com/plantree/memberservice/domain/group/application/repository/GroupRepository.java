package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Group;

public interface GroupRepository {

    Group save(Group group);
}
