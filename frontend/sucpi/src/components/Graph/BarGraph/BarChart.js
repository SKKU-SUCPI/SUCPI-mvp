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
                    legend: '항목',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '건 수',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                theme={{
                    axis: {
                        ticks: {
                            line: {
                                stroke: '#4caf50', // 축의 눈금선 색상
                            },
                            text: {
                                fill: '#000000', // 축의 텍스트 색상
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: '#e0e0e0', // 그리드 선 색상
                            strokeDasharray: '6 6',
                        },
                    },
                }}
                colors={['#8DC63F']} // 더 진한 초록색으로 설정
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
}
