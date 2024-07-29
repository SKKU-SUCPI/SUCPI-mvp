package com.skku.sucpi.dto;

import java.util.List;

import com.skku.sucpi.entity.CQWeight;
import com.skku.sucpi.entity.LQWeight;
import com.skku.sucpi.entity.RQWeight;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WeightDTO {

    private List<LQWeight> LQWeights;
    private List<RQWeight> RQWeights;
    private List<CQWeight> CQWeights;

    // Getters and Setters

    public List<LQWeight> getLQWeights() {
        return LQWeights;
    }

    public void setLQWeights(List<LQWeight> LQWeights) {
        this.LQWeights = LQWeights;
    }

    public List<RQWeight> getRQWeights() {
        return RQWeights;
    }

    public void setRQWeights(List<RQWeight> RQWeights) {
        this.RQWeights = RQWeights;
    }

    public List<CQWeight> getCQWeights() {
        return CQWeights;
    }

    public void setCQWeights(List<CQWeight> CQWeights) {
        this.CQWeights = CQWeights;
    }
}