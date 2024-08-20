package com.skku.sucpi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.WeightDTO;
import com.skku.sucpi.repository.CQWeightRepository;
import com.skku.sucpi.repository.LQWeightRepository;
import com.skku.sucpi.repository.RQWeightRepository;

@Service
public class WeightService {

    @Autowired
    private LQWeightRepository lqWeightRepository;

    @Autowired
    private RQWeightRepository rqWeightRepository;

    @Autowired
    private CQWeightRepository cqWeightRepository;

    @Autowired
    private StudentProfileService studentProfileService;

    public WeightDTO getAllWeights() {
        WeightDTO allWeights = new WeightDTO();
        allWeights.setLQWeights(lqWeightRepository.findAll());
        allWeights.setRQWeights(rqWeightRepository.findAll());
        allWeights.setCQWeights(cqWeightRepository.findAll());
        return allWeights;
    }

    public void saveWeights(WeightDTO weights) {
        if (weights.getLQWeights() != null) {
            lqWeightRepository.saveAll(weights.getLQWeights());
        }
        if (weights.getRQWeights() != null) {
            rqWeightRepository.saveAll(weights.getRQWeights());
        }
        if (weights.getCQWeights() != null) {
            cqWeightRepository.saveAll(weights.getCQWeights());
        }
        
        studentProfileService.calculateRawScores();
        studentProfileService.updateAdjustedScores();
        
    }
}
