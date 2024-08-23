package com.skku.sucpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentLeaderboardDTO {
    private int rank;
    private String studentName;
    private String studentId;
    private int studentGrade;
    private String studentMajor;
    private float lqScore;
    private float rqScore;
    private float cqScore;
    private float totalScore;

    // Ensure this constructor exists
    public StudentLeaderboardDTO(String studentName, String studentId, int studentGrade, String studentMajor, float lqScore, float rqScore, float cqScore, float totalScore) {
        this.studentName = studentName;
        this.studentId = studentId;
        this.studentGrade = studentGrade;
        this.studentMajor = studentMajor;
        this.lqScore = lqScore;
        this.rqScore = rqScore;
        this.cqScore = cqScore;
        this.totalScore = totalScore;
        this.rank = 0; // Initial rank value
    }

    // Getter methods with rounding to 2 decimal places
    public float getLqScore() {
        return roundToTwoDecimalPlaces(lqScore);
    }

    public float getRqScore() {
        return roundToTwoDecimalPlaces(rqScore);
    }

    public float getCqScore() {
        return roundToTwoDecimalPlaces(cqScore);
    }

    public float getTotalScore() {
        return roundToTwoDecimalPlaces(totalScore);
    }

    // Helper method to round float values to 2 decimal places
    private static float roundToTwoDecimalPlaces(float value) {
        return Math.round(value * 100.0f) / 100.0f;
    }
}
