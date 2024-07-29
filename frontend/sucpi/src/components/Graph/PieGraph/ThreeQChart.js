// ThreeQChart.jsx
import React from 'react';
import { DonutChart } from './DonutChart';

export function ThreeQChart() {
    const data = [
        { id: 'LQ', label: 'LQ', value: 30, color: 'hsl(120, 70%, 50%)' },
        { id: 'CQ', label: 'CQ', value: 20, color: 'hsl(220, 70%, 50%)' },
        { id: 'RQ', label: 'RQ', value: 50, color: 'hsl(10, 70%, 50%)' },
    ];

    return <DonutChart data={data} title="3Q 수행 비율 (건)" />;
}
