package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.repository.LRCRatioRepository;

@Service
public class LRCRatioService {
    

    @Autowired
    private LRCRatioRepository lrcRatioRepository;

    public List<LRCRatio> findAll() {
        return lrcRatioRepository.findAll();
    }

    public LRCRatio findById(Long id) {
        return lrcRatioRepository.findById(id).orElse(null);
    }

    public LRCRatio save(LRCRatio lrcRatio) {
        return lrcRatioRepository.save(lrcRatio);
    }

    public void deleteById(Long id) {
        lrcRatioRepository.deleteById(id);
    }


    // 기존 LRCRatio 업데이트
    public LRCRatio update(LRCRatio newRatio) {
        Long fixedId = 1L; // 고정된 ID 값
        LRCRatio ratio = lrcRatioRepository.findById(fixedId)
            .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));

        ratio.setLqRatio(newRatio.getLqRatio());
        ratio.setRqRatio(newRatio.getRqRatio());
        ratio.setCqRatio(newRatio.getCqRatio());
        return lrcRatioRepository.save(ratio);
    }

    //LRCq 비율 계산
}

