package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.CQStudent;

@Repository
public interface CQStudentRepository extends JpaRepository<CQStudent, String> {
}
