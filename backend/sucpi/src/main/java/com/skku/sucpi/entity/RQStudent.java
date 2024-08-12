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
@Table(name = "rqInfo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RQStudent {

    @Id
    private String studentId;
    private int yulJcr5Main;
    private int yulJcr5Part;
    private int yulJcr10Main;
    private int yulJcr10Part;
    private int yulJcr20Main;
    private int yulJcr20Part;
    private int yulKnownSpeech;
    private int yulKnownPoster;
    private int yulNormalSpeech;
    private int yulNormalPoster;
    private int yulNationalSpeech;
    private int yulNationalPoster;
    private int yulTopBigCompetition;
    private int yulWinBigCompetition;
    private int yulPlayBigCompetition;
    private int yulTopSchoolCompetition;
    private int yulWinSchoolCompetition;
    private int yulPlaySchoolCompetition;
    private int myeongOverKci;
    private int myeongKciExcellent;
    private int myeongKci;
    private int myeongKciCandidate;
    private int myeongKnownSpeech;
    private int myeongNormalSpeech;
    private int myeongNationalSpeech;
    private int myeongTopBigCompetition;
    private int myeongWinBigCompetition;
    private int myeongPlayBigCompetition;
    private int myeongTopSchoolCompetition;
    private int myeongWinSchoolCompetition;
    private int myeongPlaySchoolCompetition;
}
