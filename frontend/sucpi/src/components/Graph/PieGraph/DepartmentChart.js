// DepartmentChart.jsx
import React from 'react';
import { DonutChart } from './DonutChart';

export function DepartmentChart() {
    const data = [
        { id: '소프트웨어학과', label: '소프트웨어학과', value: 40, color: 'hsl(120, 70%, 50%)' },
        { id: '글로벌융합학부', label: '글로벌융합학부', value: 25, color: 'hsl(220, 70%, 50%)' },
        { id: '지능형소프트웨어학과', label: '지능형소프트웨어학과', value: 20, color: 'hsl(10, 70%, 50%)' },
    ];

    return (
        <div style={{ minWidth: '440px' }}>  {/* 원하는 크기로 설정 */}
            <DonutChart data={data} title="학과 별 비율" />
        </div>
    );
}
