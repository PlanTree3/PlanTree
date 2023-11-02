package com.plantree.memberservice.domain.member.infra;

import com.plantree.memberservice.domain.member.application.repository.TeacherRepository;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.domain.member.infra.jpa.TeacherJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TeacherRepositoryImpl implements TeacherRepository {

    private final TeacherJpaRepository teacherJpaRepository;

    @Override
    public Teacher save(Teacher teacher) {
        return teacherJpaRepository.save(teacher);
    }
}
