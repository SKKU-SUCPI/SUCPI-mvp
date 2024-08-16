package com.skku.sucpi.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private StudentRepository studentRepository;

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

    public List<Double> calculateAvg() {
        List<Double> avgQ;
        Double totalLqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentLqScore)
            .average().orElse(0.0);
        Double totalRqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentRqScore)
            .average().orElse(0.0);
        Double totalCqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentCqScore)
            .average().orElse(0.0);
        avgQ = List.of(totalLqScore,totalRqScore,totalCqScore);
        return avgQ;
    }

    public List<Double> calculateStdDeviation() {
        List<Double> avgQ = calculateAvg();
        double LQ_avg = avgQ.get(1);
        double RQ_avg = avgQ.get(2);
        double CQ_avg = avgQ.get(3);

        double LQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentLqScore() - LQ_avg, 2))
            .average()
            .orElse(0.0);

        double RQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentRqScore() - RQ_avg, 2))
            .average()
            .orElse(0.0);

        double CQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentCqScore() - CQ_avg, 2))
            .average()
            .orElse(0.0);

        double LQ_stdDev = Math.sqrt(LQ_variance);
        double RQ_stdDev = Math.sqrt(RQ_variance);
        double CQ_stdDev = Math.sqrt(CQ_variance);

        return List.of(LQ_stdDev, RQ_stdDev, CQ_stdDev);
    }

    // 기존 3Q 비율(%)
    // public List<Float> calculatePrevQ(LRCRatio lrcRatio) {
    //     Long fixedId = 1L;
    //     LRCRatio ratio = lrcRatioRepository.findById(fixedId)
    //         .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));
        
    // }
    // // 변경된 3Q 비율(%)
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

