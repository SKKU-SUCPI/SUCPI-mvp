package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.LQWeight;

@Repository
public interface LQWeightRepository extends JpaRepository<LQWeight, Long> {
}
