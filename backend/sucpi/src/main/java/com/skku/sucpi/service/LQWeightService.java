package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.LQWeight;
import com.skku.sucpi.repository.LQWeightRepository;

@Service
public class LQWeightService {

    @Autowired
    private LQWeightRepository lqWeightRepository;

    public List<LQWeight> findAll() {
        return lqWeightRepository.findAll();
    }

    public LQWeight findById(Long id) {
        return lqWeightRepository.findById(id).orElse(null);
    }

    public LQWeight save(LQWeight lqWeight) {
        return lqWeightRepository.save(lqWeight);
    }

    public void deleteById(Long id) {
        lqWeightRepository.deleteById(id);
    }
}

