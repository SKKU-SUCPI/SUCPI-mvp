package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lqInfo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LQStudent {

    @Id
    private String studentId;
    private int activityEdu;
    private int activityTA;
    private int grade40TO45;
    private int grade35TO40;
    private int grade30TO35;
    private int grade00TO30;
    private int openSourceActivityStar0;
    private int openSourceActivityStar3;
    private int openSourceActivityStar4;
    private int openSourceActivityStar5;
    private int committerStar0;
    private int committerStar3;
    private int committerStar4;
    private int committerStar5;
}
