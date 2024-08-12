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
@Table(name = "statistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {

    @Id
    //총 Lq,Rq,Cq 건수
    private int lqCount;
    private int cqCount;
    private int rqCount;

    //학생들의 총 Lq,Rq,Cq 건수
    private int studentsTotalNum;
    private int studentsTotalLqNum;
    private int studentsTotalCqNum;
    private int studentsTotalRqNum;
}