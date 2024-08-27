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
    private NewRank newRank;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OldScore {
        private float oldLqScore;
        private float oldRqScore;
        private float oldCqScore;
        private float oldTotalScore;

        // Getter methods with rounding to 2 decimal places
        public float getOldLqScore() {
            return roundToTwoDecimalPlaces(oldLqScore);
        }

        public float getOldRqScore() {
            return roundToTwoDecimalPlaces(oldRqScore);
        }

        public float getOldCqScore() {
            return roundToTwoDecimalPlaces(oldCqScore);
        }

        public float getOldTotalScore() {
            return roundToTwoDecimalPlaces(oldTotalScore);
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewScore {
        private float newLqScore;
        private float newRqScore;
        private float newCqScore;
        private float newTotalScore;

        // Getter methods with rounding to 2 decimal places
        public float getNewLqScore() {
            return roundToTwoDecimalPlaces(newLqScore);
        }

        public float getNewRqScore() {
            return roundToTwoDecimalPlaces(newRqScore);
        }

        public float getNewCqScore() {
            return roundToTwoDecimalPlaces(newCqScore);
        }

        public float getNewTotalScore() {
            return roundToTwoDecimalPlaces(newTotalScore);
        }
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

    // Helper method to round float values to 2 decimal places
    private static float roundToTwoDecimalPlaces(float value) {
        return Math.round(value * 100.0f) / 100.0f;
    }
}
