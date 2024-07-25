package com.skku.sucpi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lrc_ratio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LRCRatio {

    @Id
    private float lqRatio;
    private float rqRatio;
    private float cqRatio;
}