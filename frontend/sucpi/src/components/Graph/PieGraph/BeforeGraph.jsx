import React, { useEffect, useState } from 'react';
import { DonutChart } from './DonutChart';

export function BeforeGraph({ ratios }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (ratios) {
            const { prev_LQ_avg, prev_CQ_avg, prev_RQ_avg } = ratios;
            if (prev_LQ_avg !== undefined && prev_CQ_avg !== undefined && prev_RQ_avg !== undefined) {
                setData([
                    { id: 'LQ', label: 'LQ', value: prev_LQ_avg, color: 'hsl(120, 70%, 50%)' },
                    { id: 'CQ', label: 'CQ', value: prev_CQ_avg, color: 'hsl(220, 70%, 50%)' },
                    { id: 'RQ', label: 'RQ', value: prev_RQ_avg, color: 'hsl(10, 70%, 50%)' },
                ]);
            }
        }
    }, [ratios]);

    useEffect(() => {
        console.log('Updated data for DonutChart:', data);
    }, [data]);

    return <DonutChart data={data} title="기존 3Q 비율(%)" />;
}
