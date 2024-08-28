package com.skku.sucpi.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LRCRatioDTO {
    private float prev_LQratio;
    private float prev_RQratio;
    private float prev_CQratio;
    private float temp_LQratio;
    private float temp_RQratio;
    private float temp_CQratio;
    private Map<String,Double> prev_avgQ;
    private Map<String,Double> temp_avgQ;
}
