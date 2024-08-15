import React, { useEffect, useState } from 'react';
import { DonutChart } from './DonutChart';

export function BeforeGraph({ ratios }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (ratios && ratios.lqRatio !== undefined && ratios.cqRatio !== undefined && ratios.rqRatio !== undefined) {
            setData([
                { id: 'LQ', label: 'LQ', value: ratios.lqRatio, color: 'hsl(120, 70%, 50%)' },
                { id: 'CQ', label: 'CQ', value: ratios.cqRatio, color: 'hsl(220, 70%, 50%)' },
                { id: 'RQ', label: 'RQ', value: ratios.rqRatio, color: 'hsl(10, 70%, 50%)' },
            ]);
        }
    }, [ratios]);

    useEffect(() => {
        console.log('Updated data for DonutChart:', data);
    }, [data]);

    return <DonutChart data={data} title="기존 3Q 비율(%)" />;
}