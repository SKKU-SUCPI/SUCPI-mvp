package com.skku.sucpi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.service.LRCRatioService;

import lombok.RequiredArgsConstructor;



@RequestMapping("/api/admin")
@RequiredArgsConstructor
@RestController
public class LRCRatioController {
    @Autowired
    private final LRCRatioService lrcRatioService;

    //GET
    //LRCq비율 확인
    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<List<LRCRatio>>> getLRCRatio() {
        List<LRCRatio> lrcRatio = lrcRatioService.findAll();
        ApiResponse<List<LRCRatio>> response = new ApiResponse<>(
                200,
                "All LRCq ratio retrieved successfully",
                lrcRatio
        );
        return ResponseEntity.ok(response);
    }

    //POST
    //LRCq 업데이트
    @PostMapping("/settings")
    public ResponseEntity<ApiResponse<String>> postLrcRatio(@RequestBody LRCRatio lrcRatio) {
        lrcRatioService.update(lrcRatio);
        ApiResponse<String> response = new ApiResponse<>(
            200,
            "LRCq updated successfully",
            "LRCq updated successfully"
        );
        return ResponseEntity.ok(response);
    }
}
