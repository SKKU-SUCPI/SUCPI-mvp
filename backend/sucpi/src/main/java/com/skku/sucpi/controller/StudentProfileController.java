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
import com.skku.sucpi.dto.StudentProfileDTO;
import com.skku.sucpi.service.StudentProfileService;

@RestController
@RequestMapping("/api/students")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentProfileDTO>> getStudentProfileById(@PathVariable("id") String id) {
        StudentProfileDTO studentProfileDTO = studentProfileService.getStudentProfileById(id);
        if (studentProfileDTO == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Student profile not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "Student profile retrieved successfully", studentProfileDTO));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> saveStudentProfile(@RequestBody StudentProfileDTO studentProfileDTO) {
        studentProfileService.saveStudentProfile(studentProfileDTO);
        return ResponseEntity.ok(new ApiResponse<>(200, "Student profile saved successfully", "Student profile saved successfully"));
    }
}
