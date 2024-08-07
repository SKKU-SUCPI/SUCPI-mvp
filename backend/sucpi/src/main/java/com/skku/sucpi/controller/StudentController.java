package com.skku.sucpi.controller;

/*관리자가 학생을 보는 것입니다.
 * 모든 자료를 GET할 수 있다는 거죠.
 */
/*@RestController
@RequestMapping("/api/admin/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentById(@PathVariable("id") String id) {
        StudentDTO studentDTO = studentService.getStudentById(id);
        if (studentDTO == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Student not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "Student retrieved successfully", studentDTO));
    }
}*/
