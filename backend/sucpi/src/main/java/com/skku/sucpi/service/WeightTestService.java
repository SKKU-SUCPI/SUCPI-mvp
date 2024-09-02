package com.skku.sucpi.service;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.StudentTestResultDTO;
import com.skku.sucpi.dto.WeightDTO;
import com.skku.sucpi.dto.WeightTestResultDTO;
import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.CQStudentRepository;
import com.skku.sucpi.repository.LQStudentRepository;
import com.skku.sucpi.repository.LRCRatioRepository;
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

    @Autowired
    private LRCRatioRepository lrcRatioRepository;

    // Method for GET request to fetch old scores and ranks (adjusted scores)
    public StudentTestResultDTO getOldScoresAndRanks(String studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            // Fetch all students
            List<Student> allStudents = studentRepository.findAll();

            // Calculate adjusted scores for all students
            Map<String, AdjustedScores> adjustedScoresMap = calculateAdjustedScoresForAllStudents(allStudents);

            // Get adjusted scores and ranks for the specific student
            AdjustedScores studentAdjustedScores = adjustedScoresMap.get(studentId);

            // Construct and return the result DTO
            StudentTestResultDTO.OldScore oldScore = new StudentTestResultDTO.OldScore(
                    studentAdjustedScores.getLqScore(),
                    studentAdjustedScores.getRqScore(),
                    studentAdjustedScores.getCqScore(),
                    studentAdjustedScores.getTotalScore());

            StudentTestResultDTO.OldRank oldRank = new StudentTestResultDTO.OldRank(
                    studentAdjustedScores.getLqRank(),
                    studentAdjustedScores.getRqRank(),
                    studentAdjustedScores.getCqRank(),
                    studentAdjustedScores.getTotalRank());

            // New scores and ranks are zero as this is old data
            StudentTestResultDTO.NewScore newScore = new StudentTestResultDTO.NewScore(0, 0, 0, 0);
            StudentTestResultDTO.NewRank newRank = new StudentTestResultDTO.NewRank(0, 0, 0, 0);

            return new StudentTestResultDTO(oldScore, newScore, oldRank, newRank);
        }

        return null;
    }

    // Method for POST request that calculates new adjusted scores and ranks with new weights
    public StudentTestResultDTO testNewWeights(String studentId, WeightDTO newWeights) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            // Fetch all students
            List<Student> allStudents = studentRepository.findAll();

            // Calculate new raw scores for all students using new weights
            Map<String, RawScores> newRawScoresMap = calculateRawScoresForAllStudents(newWeights);

            // Calculate adjusted scores for new raw scores
            Map<String, AdjustedScores> newAdjustedScoresMap = calculateAdjustedScores(newRawScoresMap);

            // Get new adjusted scores and ranks for the specific student
            AdjustedScores newStudentAdjustedScores = newAdjustedScoresMap.get(studentId);

            // Also calculate old adjusted scores and ranks for comparison
            Map<String, AdjustedScores> oldAdjustedScoresMap = calculateAdjustedScoresForAllStudents(allStudents);
            AdjustedScores oldStudentAdjustedScores = oldAdjustedScoresMap.get(studentId);

            // Construct and return the result DTO
            StudentTestResultDTO.OldScore oldScore = new StudentTestResultDTO.OldScore(
                    oldStudentAdjustedScores.getLqScore(),
                    oldStudentAdjustedScores.getRqScore(),
                    oldStudentAdjustedScores.getCqScore(),
                    oldStudentAdjustedScores.getTotalScore());

            StudentTestResultDTO.NewScore newScore = new StudentTestResultDTO.NewScore(
                    newStudentAdjustedScores.getLqScore(),
                    newStudentAdjustedScores.getRqScore(),
                    newStudentAdjustedScores.getCqScore(),
                    newStudentAdjustedScores.getTotalScore());

            StudentTestResultDTO.OldRank oldRank = new StudentTestResultDTO.OldRank(
                    oldStudentAdjustedScores.getLqRank(),
                    oldStudentAdjustedScores.getRqRank(),
                    oldStudentAdjustedScores.getCqRank(),
                    oldStudentAdjustedScores.getTotalRank());

            StudentTestResultDTO.NewRank newRank = new StudentTestResultDTO.NewRank(
                    newStudentAdjustedScores.getLqRank(),
                    newStudentAdjustedScores.getRqRank(),
                    newStudentAdjustedScores.getCqRank(),
                    newStudentAdjustedScores.getTotalRank());

            return new StudentTestResultDTO(oldScore, newScore, oldRank, newRank);
        }

        return null;
    }

    // Calculate raw scores for all students using provided weights
    private Map<String, RawScores> calculateRawScoresForAllStudents(WeightDTO weights) {
        Map<String, RawScores> rawScoresMap = new HashMap<>();

        List<Student> students = studentRepository.findAll();

        for (Student student : students) {
            String studentId = student.getStudentId();

            Optional<LQStudent> lqStudentOpt = lqStudentRepository.findById(studentId);
            Optional<RQStudent> rqStudentOpt = rqStudentRepository.findById(studentId);
            Optional<CQStudent> cqStudentOpt = cqStudentRepository.findById(studentId);

            if (lqStudentOpt.isPresent() && rqStudentOpt.isPresent() && cqStudentOpt.isPresent()) {
                LQStudent lqStudent = lqStudentOpt.get();
                RQStudent rqStudent = rqStudentOpt.get();
                CQStudent cqStudent = cqStudentOpt.get();

                float lqScore = calculateScore(lqStudent, weights.getLQWeights());
                float rqScore = calculateScore(rqStudent, weights.getRQWeights());
                float cqScore = calculateScore(cqStudent, weights.getCQWeights());

                RawScores rawScores = new RawScores(lqScore, rqScore, cqScore);
                rawScoresMap.put(studentId, rawScores);
            }
        }

        return rawScoresMap;
    }

    // Calculate adjusted scores using raw scores
    private Map<String, AdjustedScores> calculateAdjustedScores(Map<String, RawScores> rawScoresMap) {
        Map<String, AdjustedScores> adjustedScoresMap = new HashMap<>();

        // Extract all raw scores into lists
        List<Float> lqRawScores = rawScoresMap.values().stream().map(RawScores::getLqScore).collect(Collectors.toList());
        List<Float> rqRawScores = rawScoresMap.values().stream().map(RawScores::getRqScore).collect(Collectors.toList());
        List<Float> cqRawScores = rawScoresMap.values().stream().map(RawScores::getCqScore).collect(Collectors.toList());

        // Calculate means
        float lqMean = calculateMean(lqRawScores);
        float rqMean = calculateMean(rqRawScores);
        float cqMean = calculateMean(cqRawScores);

        // Calculate standard deviations
        float lqStdDev = calculateStdDev(lqRawScores, lqMean);
        float rqStdDev = calculateStdDev(rqRawScores, rqMean);
        float cqStdDev = calculateStdDev(cqRawScores, cqMean);

        // Fetch LRC Ratios
        LRCRatio ratio = lrcRatioRepository.findAll().get(0);

        // Calculate adjusted scores and ranks
        for (Map.Entry<String, RawScores> entry : rawScoresMap.entrySet()) {
            String studentId = entry.getKey();
            RawScores rawScores = entry.getValue();

            float adjustedLqScore = standardizeScore(rawScores.getLqScore(), lqMean, lqStdDev) * ratio.getLqRatio() / 100;
            float adjustedRqScore = standardizeScore(rawScores.getRqScore(), rqMean, rqStdDev) * ratio.getRqRatio() / 100;
            float adjustedCqScore = standardizeScore(rawScores.getCqScore(), cqMean, cqStdDev) * ratio.getCqRatio() / 100;
            float adjustedTotalScore = adjustedLqScore + adjustedRqScore + adjustedCqScore;

            adjustedScoresMap.put(studentId, new AdjustedScores(studentId, adjustedLqScore, adjustedRqScore, adjustedCqScore, adjustedTotalScore));
        }

        // Calculate ranks
        calculateRanks(adjustedScoresMap, AdjustedScores::getLqScore, AdjustedScores::setLqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getRqScore, AdjustedScores::setRqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getCqScore, AdjustedScores::setCqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getTotalScore, AdjustedScores::setTotalRank);

        return adjustedScoresMap;
    }

    // Calculate adjusted scores for existing data
    private Map<String, AdjustedScores> calculateAdjustedScoresForAllStudents(List<Student> students) {
        Map<String, AdjustedScores> adjustedScoresMap = new HashMap<>();

        // Extract all raw scores into lists
        List<Float> lqRawScores = students.stream().map(Student::getStudentLqScore).collect(Collectors.toList());
        List<Float> rqRawScores = students.stream().map(Student::getStudentRqScore).collect(Collectors.toList());
        List<Float> cqRawScores = students.stream().map(Student::getStudentCqScore).collect(Collectors.toList());

        // Calculate means
        float lqMean = calculateMean(lqRawScores);
        float rqMean = calculateMean(rqRawScores);
        float cqMean = calculateMean(cqRawScores);

        // Calculate standard deviations
        float lqStdDev = calculateStdDev(lqRawScores, lqMean);
        float rqStdDev = calculateStdDev(rqRawScores, rqMean);
        float cqStdDev = calculateStdDev(cqRawScores, cqMean);

        // Fetch LRC Ratios
        LRCRatio ratio = lrcRatioRepository.findAll().get(0);

        // Calculate adjusted scores and ranks
        for (Student student : students) {
            String studentId = student.getStudentId();

            float adjustedLqScore = standardizeScore(student.getStudentLqScore(), lqMean, lqStdDev) * ratio.getLqRatio() / 100;
            float adjustedRqScore = standardizeScore(student.getStudentRqScore(), rqMean, rqStdDev) * ratio.getRqRatio() / 100;
            float adjustedCqScore = standardizeScore(student.getStudentCqScore(), cqMean, cqStdDev) * ratio.getCqRatio() / 100;
            float adjustedTotalScore = adjustedLqScore + adjustedRqScore + adjustedCqScore;

            adjustedScoresMap.put(studentId, new AdjustedScores(studentId, adjustedLqScore, adjustedRqScore, adjustedCqScore, adjustedTotalScore));
        }

        // Calculate ranks
        calculateRanks(adjustedScoresMap, AdjustedScores::getLqScore, AdjustedScores::setLqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getRqScore, AdjustedScores::setRqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getCqScore, AdjustedScores::setCqRank);
        calculateRanks(adjustedScoresMap, AdjustedScores::getTotalScore, AdjustedScores::setTotalRank);

        return adjustedScoresMap;
    }

    // Helper method to calculate mean
    private float calculateMean(List<Float> scores) {
        return (float) scores.stream().mapToDouble(Float::doubleValue).average().orElse(0.0);
    }

    // Helper method to calculate standard deviation
    private float calculateStdDev(List<Float> scores, float mean) {
        double variance = scores.stream().mapToDouble(score -> Math.pow(score - mean, 2)).average().orElse(0.0);
        return (float) Math.sqrt(variance);
    }

    // Helper method to standardize score
    private float standardizeScore(float score, float mean, float stdDev) {
        if (stdDev == 0) {
            return 50; // Avoid division by zero; assign mean score
        }
        return ((score - mean) / stdDev) * 10 + 50;
    }

    // Helper method to calculate ranks
    private void calculateRanks(Map<String, AdjustedScores> adjustedScoresMap,
                                java.util.function.Function<AdjustedScores, Float> scoreGetter,
                                java.util.function.BiConsumer<AdjustedScores, Integer> rankSetter) {
        List<Map.Entry<String, AdjustedScores>> sortedEntries = adjustedScoresMap.entrySet().stream()
                .sorted((e1, e2) -> Float.compare(scoreGetter.apply(e2.getValue()), scoreGetter.apply(e1.getValue())))
                .collect(Collectors.toList());

        int rank = 1;
        for (Map.Entry<String, AdjustedScores> entry : sortedEntries) {
            rankSetter.accept(entry.getValue(), rank++);
        }
    }

    // Calculate individual score based on weights
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

    //private static final Logger logger = Logger.getLogger(WeightTestService.class.getName());

    public WeightTestResultDTO compareAdjustedScoresWithNewWeights(WeightDTO newWeights) {
        // Fetch all students
        List<Student> allStudents = studentRepository.findAll();
    
        // Fetch LRC ratios (assuming this comes from a repository or another service)
        LRCRatio lrcRatio = lrcRatioRepository.findAll().get(0);
        float lqRatio = lrcRatio.getLqRatio() / 100.0f;  // Convert to a fraction if needed
        float rqRatio = lrcRatio.getRqRatio() / 100.0f;  // Convert to a fraction if needed
        float cqRatio = lrcRatio.getCqRatio() / 100.0f;  // Convert to a fraction if needed
    
        // Calculate the mean of old raw scores
        float oldLqMean = calculateMean(
                allStudents.stream().map(Student::getStudentLqScore).collect(Collectors.toList()));
        float oldRqMean = calculateMean(
                allStudents.stream().map(Student::getStudentRqScore).collect(Collectors.toList()));
        float oldCqMean = calculateMean(
                allStudents.stream().map(Student::getStudentCqScore).collect(Collectors.toList()));
    
        // Adjust the old means using the LQ, RQ, CQ ratios
        oldLqMean *= lqRatio;
        oldRqMean *= rqRatio;
        oldCqMean *= cqRatio;
    
        // Calculate new raw scores for all students using new weights
        Map<String, RawScores> newRawScoresMap = calculateRawScoresForAllStudents(newWeights);
    
        // Calculate the mean of new raw scores
        float newLqMean = calculateMean(
                newRawScoresMap.values().stream().map(RawScores::getLqScore).collect(Collectors.toList()));
        float newRqMean = calculateMean(
                newRawScoresMap.values().stream().map(RawScores::getRqScore).collect(Collectors.toList()));
        float newCqMean = calculateMean(
                newRawScoresMap.values().stream().map(RawScores::getCqScore).collect(Collectors.toList()));
    
        // Adjust the new means using the LQ, RQ, CQ ratios
        newLqMean *= lqRatio;
        newRqMean *= rqRatio;
        newCqMean *= cqRatio;
    
        // Prepare DTO for response
        WeightTestResultDTO.Prev_AvgQ prevAvgQ = new WeightTestResultDTO.Prev_AvgQ(oldRqMean, oldLqMean, oldCqMean);
        WeightTestResultDTO.Temp_AvgQ tempAvgQ = new WeightTestResultDTO.Temp_AvgQ(newRqMean, newLqMean, newCqMean);
    
        return new WeightTestResultDTO(prevAvgQ, tempAvgQ);
    }
    
    
    
    

    

    // Inner class to hold raw scores
    private static class RawScores {
        private float lqScore;
        private float rqScore;
        private float cqScore;

        public RawScores(float lqScore, float rqScore, float cqScore) {
            this.lqScore = lqScore;
            this.rqScore = rqScore;
            this.cqScore = cqScore;
        }

        public float getLqScore() {
            return lqScore;
        }

        public float getRqScore() {
            return rqScore;
        }

        public float getCqScore() {
            return cqScore;
        }
    }

    // Inner class to hold adjusted scores and ranks
    private static class AdjustedScores {
        private float lqScore;
        private float rqScore;
        private float cqScore;
        private float totalScore;
        private int lqRank;
        private int rqRank;
        private int cqRank;
        private int totalRank;

        public AdjustedScores(String studentId, float lqScore, float rqScore, float cqScore, float totalScore) {
            this.lqScore = lqScore;
            this.rqScore = rqScore;
            this.cqScore = cqScore;
            this.totalScore = totalScore;
        }

        public float getLqScore() {
            return lqScore;
        }

        public float getRqScore() {
            return rqScore;
        }

        public float getCqScore() {
            return cqScore;
        }

        public float getTotalScore() {
            return totalScore;
        }

        public int getLqRank() {
            return lqRank;
        }

        public void setLqRank(int lqRank) {
            this.lqRank = lqRank;
        }

        public int getRqRank() {
            return rqRank;
        }

        public void setRqRank(int rqRank) {
            this.rqRank = rqRank;
        }

        public int getCqRank() {
            return cqRank;
        }

        public void setCqRank(int cqRank) {
            this.cqRank = cqRank;
        }

        public int getTotalRank() {
            return totalRank;
        }

        public void setTotalRank(int totalRank) {
            this.totalRank = totalRank;
        }
    }
}
