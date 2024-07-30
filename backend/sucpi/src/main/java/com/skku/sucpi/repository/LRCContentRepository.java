package com.skku.sucpi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.LRCContent;

@Repository
public interface LRCContentRepository extends JpaRepository<LRCContent, Long> {
    List<LRCContent> findByStudentId(String studentId);

    void deleteByStudentId(String studentId);
}
