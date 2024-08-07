package com.skku.sucpi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.dto.StudentProfileDTO;
import com.skku.sucpi.service.StudentProfileService;

@RestController
@RequestMapping("/api/admin")
public class DummyDataController {

    @Autowired
    private StudentProfileService studentProfileService;

    @PostMapping("/dummydata")
    public ResponseEntity<ApiResponse<String>> postDummyData(@RequestBody List<StudentProfileDTO> studentProfiles) {
        for (StudentProfileDTO studentProfile : studentProfiles) {
            studentProfileService.saveStudentProfile(studentProfile);
        }
        ApiResponse<String> response = new ApiResponse<>(200, "Dummy data posted successfully", "Success");
        return ResponseEntity.ok(response);
    }
}
