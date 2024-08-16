import React from 'react';
import { DonutChart } from './DonutChart';

export function ThreeQChart({ data }) {
    // data.lrc_statistics가 존재하는지 확인하여 에러 방지
    if (!data?.lrc_statistics) {
        console.log("데이터가 아직 로드되지 않았습니다.");
        return <div>Loading...</div>;  // 데이터가 없는 경우 로딩 메시지 표시
    }

    // 데이터를 가져와서 차트에 전달
    const lrcData = [
        { id: 'LQ', label: 'LQ', value: data.lrc_statistics.LQ, color: 'hsl(120, 70%, 50%)' },
        { id: 'RQ', label: 'RQ', value: data.lrc_statistics.RQ, color: 'hsl(10, 70%, 50%)' },
        { id: 'CQ', label: 'CQ', value: data.lrc_statistics.CQ, color: 'hsl(220, 70%, 50%)' }
    ];

    return <DonutChart data={lrcData} title="3Q 수행 비율 (건)" />;
}