package com.skku.sucpi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skku.sucpi.ApiResponse;
import com.skku.sucpi.dto.StudentDTO;
import com.skku.sucpi.service.StudentService;

@RestController
@RequestMapping("/api")
public class DummyDataController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/dummydata")
    public ResponseEntity<ApiResponse<String>> saveDummyData(@RequestBody List<StudentDTO> studentDTOList) {
        for (StudentDTO studentDTO : studentDTOList) {
            studentService.saveStudent(studentDTO);
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "All dummy data saved successfully", "All dummy data saved successfully"));
    }
}
