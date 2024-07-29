package com.skku.sucpi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.LRCRatio;

@Repository
public interface LRCRatioRepository extends JpaRepository<LRCRatio, Long> {
    Optional<LRCRatio> findTopByOrderByIdAsc();
}
