import React from 'react';
import { DonutChart } from './DonutChart';

export function AfterGraph({ comparisonRatios }) {
    const data = [
        { id: 'LQ', label: 'LQ', value: comparisonRatios.compareLQ, color: 'hsl(120, 70%, 50%)' },
        { id: 'CQ', label: 'CQ', value: comparisonRatios.compareCQ, color: 'hsl(220, 70%, 50%)' },
        { id: 'RQ', label: 'RQ', value: comparisonRatios.compareRQ, color: 'hsl(10, 70%, 50%)' },
    ];

    return <DonutChart data={data} title="변경된 3Q 비율(%)" />;
}