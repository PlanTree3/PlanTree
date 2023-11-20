package com.plantree.memberservice.domain.member.application.repository;

import com.plantree.memberservice.domain.member.domain.Student;
import java.util.List;

public interface StudentRepository {

    Student save(Student student);

    List<Student> findAll();

}
