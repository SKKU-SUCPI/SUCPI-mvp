package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lq_students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LQStudent {

    @Id
    private String studentId;
    private int lqEduActivity1;
    private int lqEduActivity2;
    private int lqGrade40TO45;
    private int lqGrade35TO40;
    private int lqGrade30TO35;
    private int lqOpenSourceActivity1Star1;
    private int lqOpenSourceActivity1Star2;
    private int lqOpenSourceActivity1Star3;
    private int lqOpenSourceActivity1Star4;
    private int lqOpenSourceActivity1Star5;
    private int lqOpenSourceActivity2Star1;
    private int lqOpenSourceActivity2Star2;
    private int lqOpenSourceActivity2Star3;
    private int lqOpenSourceActivity2Star4;
    private int lqOpenSourceActivity2Star5;
}
