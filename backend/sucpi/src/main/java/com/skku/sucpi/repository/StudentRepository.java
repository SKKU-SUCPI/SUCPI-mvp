package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
}
