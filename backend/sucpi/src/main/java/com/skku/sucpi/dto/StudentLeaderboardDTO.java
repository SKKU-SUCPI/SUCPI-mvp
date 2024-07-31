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
}
