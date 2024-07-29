// ThreeQChart.jsx
import React from 'react';
import { DonutChart } from './DonutChart';

export function AfterGraph() {
    const data = [
        { id: 'LQ', label: 'LQ', value: 10, color: 'hsl(120, 70%, 50%)' },
        { id: 'CQ', label: 'CQ', value: 30, color: 'hsl(220, 70%, 50%)' },
        { id: 'RQ', label: 'RQ', value: 60, color: 'hsl(10, 70%, 50%)' },
    ];

    return <DonutChart data={data} title="변경된 3Q 비율(%)" />;
}
