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
public class StudentTestResultDTO {
    private OldScore oldScore;

    private NewScore newScore;

    private OldRank oldRank;

    private NewRank NewRank;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OldScore {
        private float oldLqScore;
        private float oldRqScore;
        private float oldCqScore;
        private float oldTotalScore;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewScore {
        private float newLqScore;
        private float newRqScore;
        private float newCqScore;
        private float newTotalScore;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OldRank {
        private int oldRankLq;
        private int oldRankRq;
        private int oldRankCq;
        private int oldRankTotal;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewRank {
        private int newRankLq;
        private int newRankRq;
        private int newRankCq;
        private int newRankTotal;
    }
    
}

