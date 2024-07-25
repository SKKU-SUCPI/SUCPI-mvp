package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.RQWeight;
import com.skku.sucpi.repository.RQWeightRepository;

@Service
public class RQWeightService {

    @Autowired
    private RQWeightRepository rqWeightRepository;

    public List<RQWeight> findAll() {
        return rqWeightRepository.findAll();
    }

    public RQWeight findById(Long id) {
        return rqWeightRepository.findById(id).orElse(null);
    }

    public RQWeight save(RQWeight rqWeight) {
        return rqWeightRepository.save(rqWeight);
    }

    public void deleteById(Long id) {
        rqWeightRepository.deleteById(id);
    }
}

