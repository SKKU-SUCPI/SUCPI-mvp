// DonutChart.jsx
import React, { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import '../../../Admin/statistic/Statistic.css'

export function DonutChart({ data, title }) {
    const customColors = ['#072B61', '#8DC63F', '#FF6C0F', '#0E341B'];

    useEffect(() => {
        console.log('DonutChart data updated:', data);
    }, [data]);

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor= "#FFFFFF"
                colors={customColors}
            />
        </div>
    );
}
