import React from 'react';
import { DonutChart } from './DonutChart';

export function GradeChart({ data }) {
    // grade_statistics 객체가 존재하지 않거나 값이 없는 경우 기본값을 사용하도록 설정
    const gradeStatistics = data.grade_statistics || {};

    const gradeData = [
        { id: '1학년', label: '1학년', value: gradeStatistics['1'] || 0, color: 'hsl(120, 70%, 50%)' },
        { id: '2학년', label: '2학년', value: gradeStatistics['2'] || 0, color: 'hsl(220, 70%, 50%)' },
        { id: '3학년', label: '3학년', value: gradeStatistics['3'] || 0, color: 'hsl(10, 70%, 50%)' },
        { id: '4학년', label: '4학년', value: gradeStatistics['4'] || 0, color: 'hsl(300, 70%, 50%)' },
        { id: '5학년', label: '5학년 이상', value: gradeStatistics['5'] || 0, color: 'hsl(300, 70%, 50%)' },
    ];

    return <DonutChart data={gradeData} title="학년 별 비율" />;
}
