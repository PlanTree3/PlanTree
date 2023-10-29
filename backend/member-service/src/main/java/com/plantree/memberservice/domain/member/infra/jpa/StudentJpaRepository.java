package com.plantree.memberservice.domain.member.infra.jpa;

import com.plantree.memberservice.domain.member.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentJpaRepository extends JpaRepository<Student, Long> {

}
