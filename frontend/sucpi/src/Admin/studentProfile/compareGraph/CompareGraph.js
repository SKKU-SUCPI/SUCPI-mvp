import React from "react";
import { ResponsiveBar } from '@nivo/bar';

import './CompareGraph.css'

export function CompareGraph()
{
    return (
        <div className="compare-graph-container">
            <LQGraph />
            <RQGraph />
            <CQGraph />
            <TotalGraph />
        </div>
    );
}

export function LQGraph() {
    const data = [
        {
            compare: '현재',
            점수: 95,
        },
        {
            compare: '변경',
            점수: 85,
        },
    ];

    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,  // 막대의 모서리를 둥글게 만듦
        colors: ({ id, data }) => data.compare === '현재' ? 'url(#gradientA)' : 'url(#gradientB)', // 막대에 그라데이션 적용
        defs: [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#346026' }, // 시작 색상 (진한 초록)
                    { offset: 100, color: 'rgba(14, 52, 27, 0.3)' }, // 끝 색상 (투명도 적용된 초록)
                ],
            },
            {
                id: 'gradientB',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#FF6C0F' }, // 시작 색상 (오렌지)
                    { offset: 100, color: 'rgba(255, 108, 15, 0.3)' }, // 끝 색상 (투명도 적용된 오렌지)
                ],
            },
        ],
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '조정 LQ',
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
            <h4>LQ</h4>
            <ResponsiveBar {...commonProperties} />
            <PercentageBox percentage={5} isPositive={true} />
        </div>
    );
}

export function RQGraph() {
    const data = [
        {
            compare: '현재',
            점수: 95,
        },
        {
            compare: '변경',
            점수: 85,
        },
    ];

    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,  // 막대의 모서리를 둥글게 만듦
        colors: ({ id, data }) => data.compare === '현재' ? 'url(#gradientA)' : 'url(#gradientB)', // 막대에 그라데이션 적용
        defs: [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#0E341B' }, // 시작 색상 (진한 초록)
                    { offset: 100, color: 'rgba(14, 52, 27, 0.3)' }, // 끝 색상 (투명도 적용된 초록)
                ],
            },
            {
                id: 'gradientB',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#FF6C0F' }, // 시작 색상 (오렌지)
                    { offset: 100, color: 'rgba(255, 108, 15, 0.3)' }, // 끝 색상 (투명도 적용된 오렌지)
                ],
            },
        ],
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '조정 RQ',
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
            <h4>RQ</h4>
            <ResponsiveBar {...commonProperties} />
            <PercentageBox percentage={5} isPositive={true} />
        </div>
    );
}

export function CQGraph() {
    const data = [
        {
            compare: '현재',
            점수: 95,
        },
        {
            compare: '변경',
            점수: 85,
        },
    ];

    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,  // 막대의 모서리를 둥글게 만듦
        colors: ({ id, data }) => data.compare === '현재' ? 'url(#gradientA)' : 'url(#gradientB)', // 막대에 그라데이션 적용
        defs: [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#0E341B' }, // 시작 색상 (진한 초록)
                    { offset: 100, color: 'rgba(14, 52, 27, 0.3)' }, // 끝 색상 (투명도 적용된 초록)
                ],
            },
            {
                id: 'gradientB',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#FF6C0F' }, // 시작 색상 (오렌지)
                    { offset: 100, color: 'rgba(255, 108, 15, 0.3)' }, // 끝 색상 (투명도 적용된 오렌지)
                ],
            },
        ],
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '조정 CQ',
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
            <h4>CQ</h4>
            <ResponsiveBar {...commonProperties} />
            <PercentageBox percentage={-3} isPositive={false} />
        </div>
    );
}

export function TotalGraph() {
    const data = [
        {
            compare: '현재',
            점수: 95,
        },
        {
            compare: '변경',
            점수: 85,
        },
    ];

    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,  // 막대의 모서리를 둥글게 만듦
        colors: ({ id, data }) => data.compare === '현재' ? 'url(#gradientA)' : 'url(#gradientB)', // 막대에 그라데이션 적용
        defs: [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#0E341B' }, // 시작 색상 (진한 초록)
                    { offset: 100, color: 'rgba(14, 52, 27, 0.3)' }, // 끝 색상 (투명도 적용된 초록)
                ],
            },
            {
                id: 'gradientB',
                type: 'linearGradient',
                colors: [
                    { offset: 80, color: '#FF6C0F' }, // 시작 색상 (오렌지)
                    { offset: 100, color: 'rgba(255, 108, 15, 0.3)' }, // 끝 색상 (투명도 적용된 오렌지)
                ],
            },
        ],
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '조정 총점',
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
            <h4>TOTAL</h4>
            <ResponsiveBar {...commonProperties} />
            <PercentageBox percentage={5} isPositive={true} />
        </div>
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