package com.skku.sucpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LRCRatioDTO {
    private float LQratio;
    private float RQratio;
    private float CQratio;
}
