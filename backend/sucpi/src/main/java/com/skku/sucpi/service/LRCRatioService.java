package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.LRCRatioDTO;
import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.LRCRatioRepository;
import com.skku.sucpi.repository.StudentRepository;

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
    public LRCRatioDTO update(LRCRatio newRatio) {
        Long fixedId = 1L; // 고정된 ID 값
        LRCRatio ratio = lrcRatioRepository.findById(fixedId)
            .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));

        ratio.setLqRatio(newRatio.getLqRatio());
        ratio.setRqRatio(newRatio.getRqRatio());
        ratio.setCqRatio(newRatio.getCqRatio());
        lrcRatioRepository.save(ratio);
        return new LRCRatioDTO(
            ratio.getLqRatio(),
            ratio.getRqRatio(),
            ratio.getCqRatio()
        );
    }

    // 기존 LRCRatio 비교
    public LRCRatioDTO compare(LRCRatio tempRatio) {
        LRCRatio ratio = new LRCRatio();
        ratio.setLqRatio(tempRatio.getLqRatio());
        ratio.setRqRatio(tempRatio.getRqRatio());
        ratio.setCqRatio(tempRatio.getCqRatio());
        // calculatePrevQ(tempRatio);
        return new LRCRatioDTO(
            ratio.getLqRatio(),
            ratio.getRqRatio(),
            ratio.getCqRatio()
        );
    }

    //점수 평균, 표준편차 계산
    public Float calculateAvg() {
        List<Student> Students = studentRepository.findAll().stream()

    
    }

    //LRCq 비율 계산
    // public List<Float> calculatePrevQ(LRCRatio lrcRatio) {
    //     Long fixedId = 1L; // 고정된 ID 값
    //     LRCRatio ratio = lrcRatioRepository.findById(fixedId)
    //         .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));
        
    // }

    // public List<Float> calculateTempQ(LRCRatio tempRatio) {
        
    
    // }

    //DTO
    public LRCRatioDTO getLRCRatio() {
        Long fixedId = 1L;
        LRCRatio ratio = lrcRatioRepository.findById(fixedId)
            .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));
        float lqRatio = ratio.getLqRatio();
        float rqRatio = ratio.getRqRatio();
        float cqRatio = ratio.getCqRatio();
        return new LRCRatioDTO(
            lqRatio,
            rqRatio,
            cqRatio
        );
    }
}

