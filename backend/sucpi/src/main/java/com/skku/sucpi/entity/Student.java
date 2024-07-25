package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    private String studentId;
    private String studentMajor;
    private String studentName;
    private int studentGrade;
    private String studentPhoneNum;
    private float studentRqScore;
    private float studentLqScore;
    private float studentCqScore;
    private int studentRqNum;
    private int studentLqNum;
    private int studentCqNum;

    
}