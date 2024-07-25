package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.CQWeight;
import com.skku.sucpi.repository.CQWeightRepository;

@Service
public class CQWeightService {

    @Autowired
    private CQWeightRepository cqWeightRepository;

    public List<CQWeight> findAll() {
        return cqWeightRepository.findAll();
    }

    public CQWeight findById(Long id) {
        return cqWeightRepository.findById(id).orElse(null);
    }

    public CQWeight save(CQWeight cqWeight) {
        return cqWeightRepository.save(cqWeight);
    }

    public void deleteById(Long id) {
        cqWeightRepository.deleteById(id);
    }
}

