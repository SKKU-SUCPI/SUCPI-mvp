package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rq_students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RQStudent {

    @Id
    private String studentId;
    private int rqYulJcr5Main;
    private int rqYulJcr5Part;
    private int rqYulJcr10Main;
    private int rqYulJcr10Part;
    private int rqYulJcr20Main;
    private int rqYulJcr20Part;
    private int rqYulKnownSpeech;
    private int rqYulKnownPoster;
    private int rqYulNormalSpeech;
    private int rqYulNormalPoster;
    private int rqYulNationalSpeech;
    private int rqYulNationalPoster;
    private int rqYulTopBigCompetition;
    private int rqYulWinBigCompetition;
    private int rqYulPlayBigCompetition;
    private int rqYulTopSchoolCompetition;
    private int rqYulWinSchoolCompetition;
    private int rqYulPlaySchoolCompetition;
    private int rqMyeongOverKci;
    private int rqMyeongKciExcellent;
    private int rqMyeongKci;
    private int rqMyeongKciCandidate;
    private int rqMyeongKnownSpeech;
    private int rqMyeongNormalSpeech;
    private int rqMyeongNationalSpeech;
    private int rqMyeongTopBigCompetition;
    private int rqMyeongWinBigCompetition;
    private int rqMyeongPlayBigCompetition;
    private int rqMyeongTopSchoolCompetition;
    private int rqMyeongWinSchoolCompetition;
    private int rqMyeongPlaySchoolCompetition;
}
