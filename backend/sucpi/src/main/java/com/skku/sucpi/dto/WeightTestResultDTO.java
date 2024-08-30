package com.skku.sucpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeightTestResultDTO {
    private Prev_AvgQ prev_avqQ;
    private Temp_AvgQ temp_avgQ;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Prev_AvgQ {
        private float prev_RQ_avg;
        private float prev_LQ_avg;
        private float prev_CQ_avg;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Temp_AvgQ {
        private float temp_RQ_avg;
        private float temp_LQ_avg;
        private float temp_CQ_avg;

    }

    
}
