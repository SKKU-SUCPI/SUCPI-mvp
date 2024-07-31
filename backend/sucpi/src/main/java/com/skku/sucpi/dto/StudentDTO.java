package com.skku.sucpi.dto;

import java.util.List;

import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.LRCContent;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Student student;
    private LQStudent lqStudent;
    private RQStudent rqStudent;
    private CQStudent cqStudent;
    private List<LRCContent> lrcContents;
}