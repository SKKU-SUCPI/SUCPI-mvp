package com.skku.sucpi.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private StudentProfileService studentProfileService;

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
    public LRCRatio update(LRCRatio newRatio) {
        Long fixedId = 1L; // 고정된 ID 값
        LRCRatio ratio = lrcRatioRepository.findById(fixedId)
            .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));

        ratio.setLqRatio(newRatio.getLqRatio());
        ratio.setRqRatio(newRatio.getRqRatio());
        ratio.setCqRatio(newRatio.getCqRatio());

        studentProfileService.calculateRawScores();
        studentProfileService.updateAdjustedScores();

        return lrcRatioRepository.save(ratio);
    }

    // 기존 LRCRatio 비교
    public LRCRatio compare(LRCRatio tempRatio) {
        LRCRatio ratio = new LRCRatio();
        ratio.setLqRatio(tempRatio.getLqRatio());
        ratio.setRqRatio(tempRatio.getRqRatio());
        ratio.setCqRatio(tempRatio.getCqRatio());
        // calculatePrevQ(tempRatio);
        return ratio;
    }

    //원점수 평균 구하기
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

    // 원점수 표준편차 구하기
    public List<Double> calculateStdDeviation() {
        List<Double> avgQ = calculateAvg();
        double LQ_avg = avgQ.get(0);
        double RQ_avg = avgQ.get(1);
        double CQ_avg = avgQ.get(2);

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
    public Map<String,Double> calculatePrevQ(LRCRatio prevRatio) {
        List<Double> avgQ = calculateAvg();
        double LQ_avg = avgQ.get(0);
        double RQ_avg = avgQ.get(1);
        double CQ_avg = avgQ.get(2);
        System.out.println("LQ_AVG: " + LQ_avg);
        System.out.println("RQ_AVG: " + RQ_avg);
        System.out.println("CQ_AVG: " + CQ_avg);
        LQ_avg *= prevRatio.getLqRatio() / 100;
        RQ_avg *= prevRatio.getRqRatio() / 100;
        CQ_avg *= prevRatio.getCqRatio() / 100;
        Map<String,Double> prev_avgQ = new HashMap<>();
        prev_avgQ.put("prev_LQ_avg",LQ_avg);
        prev_avgQ.put("prev_RQ_avg",RQ_avg);
        prev_avgQ.put("prev_CQ_avg",CQ_avg);
        return prev_avgQ;
    }

    // 변경된 3Q 비율(%)
    public Map<String,Double> calculateTempQ(LRCRatio tempRatio) {
        List<Double> avgQ = calculateAvg();
        Double lq_avg = avgQ.get(0);
        Double rq_avg = avgQ.get(1);
        Double cq_avg = avgQ.get(2);
        System.out.println("LQ_AVG: " + lq_avg);
        System.out.println("RQ_AVG: " + rq_avg);
        System.out.println("CQ_AVG: " + cq_avg);
        lq_avg *= tempRatio.getLqRatio() / 100;
        rq_avg *= tempRatio.getRqRatio() / 100;
        cq_avg *= tempRatio.getCqRatio() / 100;
        Map<String,Double> temp_avgQ = new HashMap<>();
        temp_avgQ.put("temp_LQ_avg",lq_avg);
        temp_avgQ.put("temp_RQ_avg",rq_avg);
        temp_avgQ.put("temp_CQ_avg",cq_avg);
        return temp_avgQ;
    }

    //DTO
    public LRCRatioDTO getLRCRatio(LRCRatio post_ratio) {
        Long fixedId = 1L;
        LRCRatio prev_ratio = lrcRatioRepository.findById(fixedId)
            .orElseThrow(() -> new RuntimeException("Ratio not found with id: " + fixedId));
        float prev_lqRatio = prev_ratio.getLqRatio();
        float prev_rqRatio = prev_ratio.getRqRatio();
        float prev_cqRatio = prev_ratio.getCqRatio();
        LRCRatio temp_ratio = compare(post_ratio);
        float temp_lqRatio = temp_ratio.getLqRatio();
        float temp_rqRatio = temp_ratio.getRqRatio();
        float temp_cqRatio = temp_ratio.getCqRatio();
        Map<String,Double> prev_avgQ = calculatePrevQ(prev_ratio);
        Map<String,Double> temp_avgQ = calculateTempQ(temp_ratio);
        return new LRCRatioDTO(
            prev_lqRatio,
            prev_rqRatio,
            prev_cqRatio,
            temp_lqRatio,
            temp_rqRatio,
            temp_cqRatio,
            prev_avgQ,
            temp_avgQ
        );
    }
}

