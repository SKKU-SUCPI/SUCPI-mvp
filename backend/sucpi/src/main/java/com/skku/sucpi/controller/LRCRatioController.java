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
import com.skku.sucpi.dto.LRCRatioDTO;
import com.skku.sucpi.dto.WeightDTO;
import com.skku.sucpi.dto.WeightTestResultDTO;
import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.repository.LRCRatioRepository;
import com.skku.sucpi.service.LRCRatioService;
import com.skku.sucpi.service.WeightTestService;

import lombok.RequiredArgsConstructor;



@RequestMapping("/api/admin")
@RequiredArgsConstructor
@RestController
public class LRCRatioController {
    @Autowired
    private final LRCRatioService lrcRatioService;
    @Autowired
    private LRCRatioRepository lrcRatioRepository;
    @Autowired
    private WeightTestService weightTestService;
    //GET
    //LRCq비율 확인
    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<LRCRatioDTO>> getLRCRatio() {
        List<LRCRatio> ratio = lrcRatioRepository.findAll();
        LRCRatioDTO lrcRatio = lrcRatioService.getLRCRatio(ratio.get(0));
        ApiResponse<LRCRatioDTO> response;
        response = new ApiResponse<>(
                200,
                "All LRCq ratio retrieved successfully",
                lrcRatio
        );
        return ResponseEntity.ok(response);
    }

    //POST
    //LRCq 업데이트
    @PostMapping("/settings/update")
    public ResponseEntity<ApiResponse<LRCRatioDTO>> updateLrcRatio(@RequestBody LRCRatio lrcRatio) {
        lrcRatioService.update(lrcRatio);
        LRCRatioDTO lrcRatio_update = lrcRatioService.getLRCRatio(lrcRatio);
        ApiResponse<LRCRatioDTO> response = new ApiResponse<>(
            200,
            "LRCq updated successfully",
            lrcRatio_update
        );
        return ResponseEntity.ok(response);
    }

    //POST
    //LRCq 비교
    @PostMapping("/settings/test")
    public ResponseEntity<ApiResponse<LRCRatioDTO>> compareLrcRatio(@RequestBody LRCRatio lrcRatio) {
        LRCRatioDTO lrcRatio_compare = lrcRatioService.getLRCRatio(lrcRatio);
        ApiResponse<LRCRatioDTO> response = new ApiResponse<>(
            200,
            "LRCq tested successfully",
            lrcRatio_compare
        );
        return ResponseEntity.ok(response);
    }


    //POST
    //setting에서 weight 특정값 변경 비교 (api주소때문에 여기에 합니다 ㅎㅎ)
    @PostMapping("/settings/weights/test")
    public ResponseEntity<ApiResponse<WeightTestResultDTO>> compareWeights(@RequestBody WeightDTO newWeights) {
        // 새로운 가중치를 바탕으로 기존 평균과 새로운 평균 비교
        WeightTestResultDTO result = weightTestService.compareAdjustedScoresWithNewWeights(newWeights);

        if (result == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Weight comparison test failed", null));
        }
        
        // API 응답 생성
        return ResponseEntity.ok(new ApiResponse<>(200, "Weight comparison test successful", result));
    }


}
