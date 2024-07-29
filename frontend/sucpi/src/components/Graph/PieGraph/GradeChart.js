// GradeChart.jsx
import React from 'react';
import { DonutChart } from './DonutChart';

export function GradeChart() {
    const data = [
        { id: '1학년', label: '1학년', value: 25, color: 'hsl(120, 70%, 50%)' },
        { id: '2학년', label: '2학년', value: 35, color: 'hsl(220, 70%, 50%)' },
        { id: '3학년', label: '3학년', value: 20, color: 'hsl(10, 70%, 50%)' },
        { id: '4학년 이상', label: '4학년 이상', value: 20, color: 'hsl(300, 70%, 50%)' },
    ];

    return <DonutChart data={data} title="학년 별 비율" />;
}
