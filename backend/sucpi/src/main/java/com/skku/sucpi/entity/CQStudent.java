package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cq_students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CQStudent {

    @Id
    private String studentId;
    private int cqCoop;
    private int cqInternship;
    private int cqStartup;
    private int cqOverseaVolunteer;
    private int cqLectureSeminar;
    private int cqAlimi;
    private int cqStudentCouncil;
    private int cqMediaPromotion;
    private int cqStudioContribution;
    private int cqStudyGroup;
}
