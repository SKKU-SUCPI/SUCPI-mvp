// DepartmentChart.jsx
import React from 'react';
import { DonutChart } from './DonutChart';

export function DepartmentChart( { data }) {

    if (!data.major_statistics) {
        return <div>Loading...</div>;
    }

    const majorData = [
        { id: '소프트웨어학과', label: '소프트웨어학과', value: data.major_statistics.SW, color: 'hsl(120, 70%, 50%)' },
        { id: '글로벌융합학부', label: '글로벌융합학부', value: data.major_statistics.GC, color: 'hsl(220, 70%, 50%)' },
        { id: '지능형소프트웨어학과', label: '지능형소프트웨어학과', value: data.major_statistics.AI, color: 'hsl(10, 70%, 50%)' },
    ];

    return (
        <div style={{ minWidth: '440px' }}>  {/* 원하는 크기로 설정 */}
            <DonutChart data={majorData} title="학과 별 비율" />
        </div>
    );
}
