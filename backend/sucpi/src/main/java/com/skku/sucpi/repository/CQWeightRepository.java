package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.CQWeight;

@Repository
public interface CQWeightRepository extends JpaRepository<CQWeight, Long> {
}

