package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cqInfo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CQStudent {

    @Id
    private String studentId;
    private int coop;
    private int internship;
    private int startup;
    private int overseaVolunteer;
    private int seminar;
    private int alimi_leader;
    private int alimi_vice_leader;
    private int alimi_participate;
    private int council_leader;
    private int council_vice_leader;
    private int council_participate;
    private int reporter_leader;
    private int reporter_vice_leader;
    private int reporter_participate;
    private int studioContribution;
    private int studyGroup_leader;
    private int studyGroup_vice_leader;
    private int studyGroup_participate;
}
