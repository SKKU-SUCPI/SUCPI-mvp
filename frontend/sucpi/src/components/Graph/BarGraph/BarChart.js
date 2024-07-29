// BarChart.jsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export function BarChart({ data }) {
    return (
        <div style={{ height: '500px' }}>
            <ResponsiveBar
                data={data}
                keys={['value']}
                indexBy="index"
                margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '항목 (전체)',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '학생 수 (건 수)',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                tooltip={({ id, value, color }) => (
                    <strong style={{ color }}>
                        {id}: {value}
                    </strong>
                )}
                barComponent={({ bar: { x, y, width, height, color }, indexValue }) => (
                    <g transform={`translate(${x},${y})`}>
                        <rect
                            x={0}
                            y={0}
                            width={"24px"}
                            height={height}
                            fill={`url(#gradient-${indexValue})`}
                            rx={12}
                            ry={10}
                        />
                        <defs>
                            <linearGradient id={`gradient-${indexValue}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="80%" stopColor={"#346026"} stopOpacity={0.9} />
                                <stop offset="100%" stopColor={"#FFFFFF"} stopOpacity={1} />
                            </linearGradient>
                        </defs>
                    </g>
                )}
            />
        </div>
    );
}
