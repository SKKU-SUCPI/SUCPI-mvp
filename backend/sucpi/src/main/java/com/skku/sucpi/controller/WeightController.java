package com.skku.sucpi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.dto.StudentTestResultDTO;
import com.skku.sucpi.dto.WeightDTO;
import com.skku.sucpi.service.WeightService;
import com.skku.sucpi.service.WeightTestService;

@RestController
@RequestMapping("/api/admin/weights")
public class WeightController {

    @Autowired
    private WeightService weightService;

    @GetMapping
    public ResponseEntity<ApiResponse<WeightDTO>> getAllWeights() {
        WeightDTO allWeights = weightService.getAllWeights();
        ApiResponse<WeightDTO> response = new ApiResponse<>(
                200,
                "All weights retrieved successfully",
                allWeights
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> saveWeights(@RequestBody WeightDTO weights) {
        weightService.saveWeights(weights);
        ApiResponse<String> response = new ApiResponse<>(
                200,
                "Weights updated successfully",
                "Weights updated successfully"
        );
        return ResponseEntity.ok(response);
    }

    @Autowired
    private WeightTestService weightTestService;

    @PostMapping("/test/{id}")
    public ResponseEntity<StudentTestResultDTO> testNewWeights(@PathVariable("id") String studentId, @RequestBody WeightDTO newWeights) {
        StudentTestResultDTO result = weightTestService.testNewWeights(studentId, newWeights);
        return ResponseEntity.ok(result);
    }
}
