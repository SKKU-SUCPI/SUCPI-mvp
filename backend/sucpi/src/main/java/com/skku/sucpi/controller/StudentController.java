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
import com.skku.sucpi.dto.StudentDTO;
import com.skku.sucpi.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentById(@PathVariable String id) {
        StudentDTO studentDTO = studentService.getStudentById(id);
        if (studentDTO == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Student not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "Student retrieved successfully", studentDTO));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> saveStudent(@RequestBody StudentDTO studentDTO) {
        StudentDTO savedStudent = studentService.saveStudent(studentDTO);
        return ResponseEntity.ok(new ApiResponse<>(200, "Student saved successfully", "Student saved successfully"));
    }
}
