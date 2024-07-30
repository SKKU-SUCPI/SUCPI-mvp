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
    private int cqAlimiLeader;
    private int cqAlimiSemiLeader;
    private int cqAlimiPlay;
    private int cqStudentCouncilLeader;
    private int cqStudentCouncilSemiLeader;
    private int cqStudentCouncilPlay;
    private int cqMediaPromotionLeader;
    private int cqMediaPromotionSemiLeader;
    private int cqMediaPromotionPlay;
    private int cqStudioContribution;
    private int cqStudyGroupLeader;
    private int cqStudyGroupSemiLeader;
    private int cqStudyGroupPlay;
}
