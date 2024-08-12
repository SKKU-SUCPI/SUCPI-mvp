package com.skku.sucpi.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.StudentTestResultDTO;
import com.skku.sucpi.dto.WeightDTO;
import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.CQStudentRepository;
import com.skku.sucpi.repository.LQStudentRepository;
import com.skku.sucpi.repository.RQStudentRepository;
import com.skku.sucpi.repository.StudentRepository;

@Service
public class WeightTestService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LQStudentRepository lqStudentRepository;

    @Autowired
    private RQStudentRepository rqStudentRepository;

    @Autowired
    private CQStudentRepository cqStudentRepository;

    // Method for GET request to fetch old scores and ranks, with new scores and ranks set to 0
    public StudentTestResultDTO getOldScoresAndRanks(String studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            // Calculate old scores
            float oldLqScore = student.getStudentLqScore();
            float oldRqScore = student.getStudentRqScore();
            float oldCqScore = student.getStudentCqScore();
            float oldTotalScore = oldLqScore + oldRqScore + oldCqScore;

            // Calculate old ranks
            int oldRankLq = calculateRank(studentId, oldLqScore, ScoreType.LQ);
            int oldRankRq = calculateRank(studentId, oldRqScore, ScoreType.RQ);
            int oldRankCq = calculateRank(studentId, oldCqScore, ScoreType.CQ);
            int oldRankTotal = calculateRank(studentId, oldTotalScore, ScoreType.TOTAL);

            // Construct and return the result DTO with new scores and ranks set to 0
            StudentTestResultDTO.OldScore oldScore = new StudentTestResultDTO.OldScore(oldLqScore, oldRqScore, oldCqScore, oldTotalScore);
            StudentTestResultDTO.NewScore newScore = new StudentTestResultDTO.NewScore(0, 0, 0, 0);
            StudentTestResultDTO.OldRank oldRank = new StudentTestResultDTO.OldRank(oldRankLq, oldRankRq, oldRankCq, oldRankTotal);
            StudentTestResultDTO.NewRank newRank = new StudentTestResultDTO.NewRank(0, 0, 0, 0);

            return new StudentTestResultDTO(oldScore, newScore, oldRank, newRank);
        }

        return null;
    }

    // Existing method for POST request that calculates new weights
    public StudentTestResultDTO testNewWeights(String studentId, WeightDTO newWeights) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<LQStudent> lqStudentOpt = lqStudentRepository.findById(studentId);
        Optional<RQStudent> rqStudentOpt = rqStudentRepository.findById(studentId);
        Optional<CQStudent> cqStudentOpt = cqStudentRepository.findById(studentId);

        if (studentOpt.isPresent() && lqStudentOpt.isPresent() && rqStudentOpt.isPresent() && cqStudentOpt.isPresent()) {
            Student student = studentOpt.get();
            LQStudent lqStudent = lqStudentOpt.get();
            RQStudent rqStudent = rqStudentOpt.get();
            CQStudent cqStudent = cqStudentOpt.get();

            // Calculate old scores
            float oldLqScore = student.getStudentLqScore();
            float oldRqScore = student.getStudentRqScore();
            float oldCqScore = student.getStudentCqScore();
            float oldTotalScore = oldLqScore + oldRqScore + oldCqScore;

            // Calculate new scores with new weights
            float newLqScore = calculateScore(lqStudent, newWeights.getLQWeights());
            float newRqScore = calculateScore(rqStudent, newWeights.getRQWeights());
            float newCqScore = calculateScore(cqStudent, newWeights.getCQWeights());
            float newTotalScore = newLqScore + newRqScore + newCqScore;

            // Calculate ranks after applying new weights
            int newRankLq = calculateNewRank(newLqScore, ScoreType.LQ, newWeights);
            int newRankRq = calculateNewRank(newRqScore, ScoreType.RQ, newWeights);
            int newRankCq = calculateNewRank(newCqScore, ScoreType.CQ, newWeights);
            int newRankTotal = calculateNewRank(newTotalScore, ScoreType.TOTAL, newWeights);

            // Calculate old ranks
            int oldRankLq = calculateRank(studentId, oldLqScore, ScoreType.LQ);
            int oldRankRq = calculateRank(studentId, oldRqScore, ScoreType.RQ);
            int oldRankCq = calculateRank(studentId, oldCqScore, ScoreType.CQ);
            int oldRankTotal = calculateRank(studentId, oldTotalScore, ScoreType.TOTAL);

            // Construct and return the result DTO
            StudentTestResultDTO.OldScore oldScore = new StudentTestResultDTO.OldScore(oldLqScore, oldRqScore, oldCqScore, oldTotalScore);
            StudentTestResultDTO.NewScore newScore = new StudentTestResultDTO.NewScore(newLqScore, newRqScore, newCqScore, newTotalScore);
            StudentTestResultDTO.OldRank oldRank = new StudentTestResultDTO.OldRank(oldRankLq, oldRankRq, oldRankCq, oldRankTotal);
            StudentTestResultDTO.NewRank newRank = new StudentTestResultDTO.NewRank(newRankLq, newRankRq, newRankCq, newRankTotal);

            return new StudentTestResultDTO(oldScore, newScore, oldRank, newRank);
        }

        return null;
    }

    private float calculateScore(Object studentSubObject, List<? extends Object> weights) {
        float score = 0;
        for (Field field : studentSubObject.getClass().getDeclaredFields()) {
            if (field.getType() == int.class) {
                field.setAccessible(true);
                try {
                    int value = field.getInt(studentSubObject);
                    for (Object weight : weights) {
                        Field datanameField = weight.getClass().getDeclaredField("dataname");
                        datanameField.setAccessible(true);
                        String dataname = (String) datanameField.get(weight);

                        if (dataname.equalsIgnoreCase(field.getName())) {
                            Field weightField = weight.getClass().getDeclaredField("weight");
                            weightField.setAccessible(true);
                            float weightValue = weightField.getFloat(weight);
                            float fieldScore = value * weightValue;
                            score += fieldScore;
                            break;
                        }
                    }
                } catch (IllegalAccessException | NoSuchFieldException e) {
                    e.printStackTrace();
                }
            }
        }
        return score;
    }

    private enum ScoreType {
        LQ, RQ, CQ, TOTAL
    }

    private int calculateRank(String studentId, float score, ScoreType scoreType) {
        List<Student> students = studentRepository.findAll();
        
        List<Float> scores = students.stream()
            .map(student -> {
                switch (scoreType) {
                    case LQ:
                        return student.getStudentLqScore();
                    case RQ:
                        return student.getStudentRqScore();
                    case CQ:
                        return student.getStudentCqScore();
                    case TOTAL:
                        return student.getStudentLqScore() + student.getStudentRqScore() + student.getStudentCqScore();
                    default:
                        return 0f;
                }
            })
            .sorted((a, b) -> Float.compare(b, a)) // descending order
            .collect(Collectors.toList());

        return scores.indexOf(score) + 1; // Rank starts from 1
    }

    private int calculateNewRank(float studentScore, ScoreType scoreType, WeightDTO newWeights) {
        List<Student> students = studentRepository.findAll();
        
        List<Float> newScores = students.stream()
            .map(student -> {
                float lqScore = calculateScore(lqStudentRepository.findById(student.getStudentId()).orElse(null), newWeights.getLQWeights());
                float rqScore = calculateScore(rqStudentRepository.findById(student.getStudentId()).orElse(null), newWeights.getRQWeights());
                float cqScore = calculateScore(cqStudentRepository.findById(student.getStudentId()).orElse(null), newWeights.getCQWeights());
                
                switch (scoreType) {
                    case LQ:
                        return lqScore;
                    case RQ:
                        return rqScore;
                    case CQ:
                        return cqScore;
                    case TOTAL:
                        return lqScore + rqScore + cqScore;
                    default:
                        return 0f;
                }
            })
            .sorted((a, b) -> Float.compare(b, a)) // descending order
            .collect(Collectors.toList());

        return newScores.indexOf(studentScore) + 1; // Rank starts from 1
    }
}
