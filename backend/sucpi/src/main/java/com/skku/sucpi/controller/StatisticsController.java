package com.skku.sucpi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.service.StatisticsService;
import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.dto.StatisticsDTO;
import com.skku.sucpi.entity.Student;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RequestMapping("/api/admin/statistics")
@RequiredArgsConstructor
@RestController
public class StatisticsController {
    @Autowired
    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<ApiResponse<StatisticsDTO>> getTotalLRCnum(
        @RequestParam(name = "Q", required = false, defaultValue = "lq,rq,cq") List<String> Q,
        @RequestParam(name = "Grade", required = false, defaultValue = "1,2,3,4") List<String> Grade,
        @RequestParam(name= "Major", required = false, defaultValue = "GC,AI,SW") List<String> Major) {

        StatisticsDTO totalStatistics = statisticsService.getStatistics(Q, Grade, Major);

        ApiResponse<StatisticsDTO> response;
        response = new ApiResponse<>(
            200,
            "All Statistics retrieved successfully",
            totalStatistics
        );
        return ResponseEntity.ok(response);
    }
}
