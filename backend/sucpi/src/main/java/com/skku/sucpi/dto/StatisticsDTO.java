package com.skku.sucpi.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {
    //Q 별 총 건수
    // private Map<String,Double> totalLrcNum;
    private Map<String,Double> Lrc_statistics;
    //학과 별 총 건수
    // private Map<String,Map<String,Double>> totalMajorNum;
    private Map<String,Double> major_statistics;
    //학년 별 총 건수
    // private Map<String,Map<String,Double>> totalGradeNum;
    private Map<String,Double> grade_statistics;
    //LQ
    private Map<String,Integer> LqStatistics;
    //RQ
    private Map<String,Integer> RqStatistics;
    //CQ
    private Map<String,Integer> CqStatistics;
}