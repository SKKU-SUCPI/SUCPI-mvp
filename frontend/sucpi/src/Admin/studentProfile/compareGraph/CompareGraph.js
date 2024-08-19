import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar';

import './CompareGraph.css'
import { CompareDetailSetting } from "./CompareDetailSetting";

export function CompareGraph()
{
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/weights')
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                setDetailData(data.result);
            } else {
                console.error('Error retrieving weights:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weights:', error);
        });
    }, []);

    return (
        <>
            <CompareDetailSetting data={detailData} />
            <hr className="divider" />
            <div className="compare-graph-container">
                <LQGraph />
                <RQGraph />
                <CQGraph />
                <TotalGraph />
            </div>
        </>
    );
}

export function ScoreGraph({ title, data, gradientAColor, gradientBColor, legend, percentage, isPositive }) {
    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,
        colors: ({ id, data }) => data.compare === '현재' ? 'url(#gradientA)' : 'url(#gradientB)',
        defs: [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: gradientAColor }, 
                    { offset: 100, color: 'rgba(14, 52, 27, 0.3)' },
                ],
            },
            {
                id: 'gradientB',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: gradientBColor },
                    { offset: 100, color: 'rgba(255, 108, 15, 0.3)' },
                ],
            },
        ],
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: legend,
            legendPosition: 'middle',
            legendOffset: 32,
        },
        axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendPosition: 'middle',
            legendOffset: -40,
        },
        labelSkipWidth: 12,
        labelSkipHeight: 12,
        labelTextColor: 'white',
        animate: true,
        motionStiffness: 90,
        motionDamping: 15,
    };

    return (
        <div className="graph">
            <h4>{title}</h4>
            <ResponsiveBar {...commonProperties} />
            <PercentageBox percentage={percentage} isPositive={isPositive} />
        </div>
    );
}

export function LQGraph() {
    const data = [
        { compare: '현재', 점수: 95 },
        { compare: '변경', 점수: 85 },
    ];

    return (
        <ScoreGraph 
            title="LQ"
            data={data}
            gradientAColor="#346026"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 LQ"
            percentage={5}
            isPositive={true}
        />
    );
}

export function RQGraph() {
    const data = [
        { compare: '현재', 점수: 95 },
        { compare: '변경', 점수: 85 },
    ];

    return (
        <ScoreGraph 
            title="RQ"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 RQ"
            percentage={3}
            isPositive={true}
        />
    );
}

export function CQGraph() {
    const data = [
        { compare: '현재', 점수: 95 },
        { compare: '변경', 점수: 85 },
    ];

    return (
        <ScoreGraph 
            title="CQ"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 CQ"
            percentage={-3}
            isPositive={false}
        />
    );
}

export function TotalGraph() {
    const data = [
        { compare: '현재', 점수: 95 },
        { compare: '변경', 점수: 85 },
    ];

    return (
        <ScoreGraph 
            title="TOTAL"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 총점"
            percentage={5}
            isPositive={true}
        />
    );
}

export function PercentageBox({ percentage, isPositive }) {
    return (
        <div className="percentage-box">
            <span className={`percentage ${isPositive ? 'positive' : 'negative'}`}>
                {percentage}%
            </span>
            <span className={`triangle ${isPositive ? 'up' : 'down'}`}></span>
        </div>
    );
}