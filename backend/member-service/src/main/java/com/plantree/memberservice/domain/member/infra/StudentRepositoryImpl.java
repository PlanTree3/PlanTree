package com.plantree.memberservice.domain.member.infra;

import com.plantree.memberservice.domain.member.application.repository.StudentRepository;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.domain.member.infra.jpa.StudentJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudentRepositoryImpl implements StudentRepository {

    private final StudentJpaRepository studentJpaRepository;

    @Override
    public Student save(Student student) {
        return studentJpaRepository.save(student);
    }

    @Override
    public List<Student> findAll() {
        return studentJpaRepository.findAll();
    }
}
