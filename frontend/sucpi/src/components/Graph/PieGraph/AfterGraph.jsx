import React from 'react';
import { DonutChart } from './DonutChart';

export function AfterGraph({ comparisonRatios }) {
    const data = [
        { id: 'LQ', label: 'LQ', value: comparisonRatios.temp_LQ_avg !== undefined ? comparisonRatios.temp_LQ_avg : 0, color: 'hsl(120, 70%, 50%)' },
        { id: 'CQ', label: 'CQ', value: comparisonRatios.temp_CQ_avg !== undefined ? comparisonRatios.temp_CQ_avg : 0, color: 'hsl(220, 70%, 50%)' },
        { id: 'RQ', label: 'RQ', value: comparisonRatios.temp_RQ_avg !== undefined ? comparisonRatios.temp_RQ_avg : 0, color: 'hsl(10, 70%, 50%)' },
    ];

    return <DonutChart data={data} title="변경된 3Q 비율(%)" />;
}