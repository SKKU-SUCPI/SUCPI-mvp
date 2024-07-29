package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.LQStudent;

@Repository
public interface LQStudentRepository extends JpaRepository<LQStudent, String> {
}
