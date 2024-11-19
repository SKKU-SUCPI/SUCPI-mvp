package com.skku.sucpi.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.dto.StudentLeaderboardDTO;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.StudentRepository;

@RestController
@RequestMapping("/api/admin")
public class LeaderboardController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/leaderboard")
    public ResponseEntity<ApiResponse<List<StudentLeaderboardDTO>>> getLeaderboard() {
        List<StudentLeaderboardDTO> leaderboard = studentRepository.findAll().stream()
                .map(student -> {
                    float totalScore = student.getAdjustLqScore() 
                            + student.getAdjustRqScore() 
                            + student.getAdjustCqScore();
                    return new StudentLeaderboardDTO(
                            student.getStudentName(),
                            student.getStudentId(),
                            student.getStudentGrade(),
                            student.getStudentMajor(),
                            student.getAdjustLqScore(),
                            student.getAdjustRqScore(),
                            student.getAdjustCqScore(),
                            totalScore // No need to set rank here
                    );
                })
                .sorted((s1, s2) -> Float.compare(s2.getTotalScore(), s1.getTotalScore())) // Sort by total score descending
                .collect(Collectors.toList());

        // Assign ranks
        IntStream.range(0, leaderboard.size())
                .forEach(i -> leaderboard.get(i).setRank(i + 1));

        ApiResponse<List<StudentLeaderboardDTO>> response = new ApiResponse<>(
                200,
                "Leaderboard data retrieved successfully",
                leaderboard
        );
        return ResponseEntity.ok(response);
    }
}