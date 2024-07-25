package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.RQWeight;

@Repository
public interface RQWeightRepository extends JpaRepository<RQWeight, Long> {
}

