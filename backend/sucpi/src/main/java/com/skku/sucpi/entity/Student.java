package com.skku.sucpi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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

    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float studentRqScore;
    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float studentLqScore;
    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float studentCqScore;

    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float adjustRqScore;
    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float adjustLqScore;
    @Column(nullable = false, columnDefinition = "FLOAT DEFAULT 0.0")
    private float adjustCqScore;

    private int studentRqNum;
    private int studentLqNum;
    private int studentCqNum;

    @PrePersist
    @PreUpdate
    public void sanitizeFields() {
        if (Float.isNaN(adjustCqScore)) adjustCqScore = 0.0f;
        if (Float.isNaN(adjustLqScore)) adjustLqScore = 0.0f;
        if (Float.isNaN(adjustRqScore)) adjustRqScore = 0.0f;
        if (Float.isNaN(studentCqScore)) studentCqScore = 0.0f;
        if (Float.isNaN(studentLqScore)) studentLqScore = 0.0f;
        if (Float.isNaN(studentRqScore)) studentRqScore = 0.0f;
    }
}