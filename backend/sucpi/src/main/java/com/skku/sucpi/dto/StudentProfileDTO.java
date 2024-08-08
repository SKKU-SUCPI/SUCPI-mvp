package com.skku.sucpi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDTO {
    private StudentInfo studentInfo;
    private LQInfo lqInfo;
    private RQInfo rqInfo;
    private CQInfo cqInfo;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentInfo {
        private String Id;
        private String major;
        private String name;
        private String phone;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LQInfo {
        private String studentId;
        private List<String> activityEdu;
        private List<String> activityTA;
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

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RQInfo {
        private String studentId;
        private List<String> yulJcr5Main;
        private List<String> yulJcr5Part;
        private List<String> yulJcr10Main;
        private List<String> yulJcr10Part;
        private List<String> yulKnownSpeech;
        private List<String> yulKnownPoster;
        private List<String> yulNormalSpeech;
        private List<String> yulNormalPoster;
        private List<String> yulNationalSpeech;
        private List<String> yulNationalPoster;
        private List<String> yulTopBigCompetition;
        private List<String> yulWinBigCompetition;
        private List<String> yulPlayBigCompetition;
        private List<String> yulTopSchoolCompetition;
        private List<String> yulWinSchoolCompetition;
        private List<String> yulPlaySchoolCompetition;
        private List<String> myeongOverKci;
        private List<String> myeongKciExcellent;
        private List<String> myeongKci;
        private List<String> myeongKciCandidate;
        private List<String> myeongKnownSpeech;
        private List<String> myeongNormalSpeech;
        private List<String> myeongNationalSpeech;
        private List<String> myeongTopBigCompetition;
        private List<String> myeongWinBigCompetition;
        private List<String> myeongPlayBigCompetition;
        private List<String> myeongTopSchoolCompetition;
        private List<String> myeongWinSchoolCompetition;
        private List<String> myeongPlaySchoolCompetition;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CQInfo {
        private String studentId;
        private String coop;
        private String internship;
        private String startup;
        private String overseaVolunteer;
        private List<String> seminar;
        private int alimi_leader;
        private int alimi_vice_leader;
        private int alimi_participate;
        private int council_leader;
        private int council_vice_leader;
        private int council_participate;
        private int reporter_leader;
        private int reporter_vice_leader;
        private int reporter_participate;
        private List<String> studioContribution;
        private int studyGroup_leader;
        private int studyGroup_vice_leader;
        private int studyGroup_participate;
    }
}
