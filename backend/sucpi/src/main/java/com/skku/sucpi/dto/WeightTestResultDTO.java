package com.skku.sucpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeightTestResultDTO {
    private Prev_AvgQ prevAvgQ;
    private Temp_AvgQ tempAvgQ;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Prev_AvgQ {
        private float prevRQAvg;
        private float prevLQAvg;
        private float prevCQAvg;

        // Getter methods with rounding to 2 decimal places
        public float getPrevRQAvg() {
            return roundToTwoDecimalPlaces(prevRQAvg);
        }

        public float getPrevLQAvg() {
            return roundToTwoDecimalPlaces(prevLQAvg);
        }

        public float getPrevCQAvg() {
            return roundToTwoDecimalPlaces(prevCQAvg);
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Temp_AvgQ {
        private float tempRQAvg;
        private float tempLQAvg;
        private float tempCQAvg;

        // Getter methods with rounding to 2 decimal places
        public float getTempRQAvg() {
            return roundToTwoDecimalPlaces(tempRQAvg);
        }

        public float getTempLQAvg() {
            return roundToTwoDecimalPlaces(tempLQAvg);
        }

        public float getTempCQAvg() {
            return roundToTwoDecimalPlaces(tempCQAvg);
        }
    }

    // Helper method to round float values to 2 decimal places
    private static float roundToTwoDecimalPlaces(float value) {
        return Math.round(value * 100.0f) / 100.0f;
    }
}
