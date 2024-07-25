package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.RQStudent;

@Repository
public interface RQStudentRepository extends JpaRepository<RQStudent, String> {
}

