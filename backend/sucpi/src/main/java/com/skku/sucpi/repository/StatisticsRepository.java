package com.skku.sucpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skku.sucpi.entity.Statistics;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Integer>{
    
}
