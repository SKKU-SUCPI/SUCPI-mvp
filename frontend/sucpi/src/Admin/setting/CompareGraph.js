import React from 'react';
import { AfterGraph } from "../../components/Graph/PieGraph/AfterGraph";
import { BeforeGraph } from "../../components/Graph/PieGraph/BeforeGraph";

export function CompareGraph({ ratios, comparisonRatios }) {
    console.log('ratios:', ratios);  // Debugging line
    console.log('comparisonRatios:', comparisonRatios);  // Debugging line

    return (
        <div style={{display: "flex", justifyContent: "space-around", gap: "0px", padding: "120px"}}>
            <BeforeGraph ratios={ratios} />
            <AfterGraph comparisonRatios={comparisonRatios} />
        </div>
    );
}