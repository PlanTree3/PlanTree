package com.plantree.memberservice.domain.member.infra.jpa;

import com.plantree.memberservice.domain.member.domain.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherJpaRepository extends JpaRepository<Teacher, Long> {

}
