import React from "react";
import { ResponsiveBar } from '@nivo/bar';
import './CompareGraph.css';

// 공통 RankBox 컴포넌트
export function RankBox({ oldRank, newRank }) {
    let rankColor;
    if (newRank !== 0) {
        if (newRank < oldRank) {
            rankColor = "red"; // newRank가 더 작으면 빨간색
        } else if (newRank > oldRank) {
            rankColor = "blue"; // newRank가 더 크면 파란색
        } else {
            rankColor = "black"; // 같으면 검정색
        }
    }

    return (
        <div className="rank-box">
            <span className="rank" style={{ fontWeight: "bold" }}>
                {oldRank}등 vs <span style={{ color: rankColor }}>{newRank}등</span>
            </span>
        </div>
    );
}

// 공통 ScoreGraph 컴포넌트
export function ScoreGraph({ title, data, gradientAColor, gradientBColor, legend, oldRank, newRank }) {
    const commonProperties = {
        data: data,
        keys: ['점수'],
        indexBy: 'compare',
        margin: { top: 50, right: 30, bottom: 100, left: 30 },
        padding: 0.3,
        valueScale: { type: 'linear' },
        indexScale: { type: 'band', round: true },
        borderRadius: 10,
        colors: ({ data }) => data.compare === '현재' ? gradientAColor : gradientBColor,
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
            <RankBox oldRank={oldRank} newRank={newRank} />
        </div>
    );
}

// LQGraph 컴포넌트
export function LQGraph({ oldScore, newScore, oldRank, newRank }) {
    const data = [
        { compare: '현재', 점수: oldScore },
        { compare: '변경', 점수: newScore },
    ];

    return (
        <ScoreGraph 
            title="LQ"
            data={data}
            gradientAColor="#346026"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 LQ"
            oldRank={oldRank}
            newRank={newRank}
        />
    );
}

// RQGraph 컴포넌트
export function RQGraph({ oldScore, newScore, oldRank, newRank }) {
    const data = [
        { compare: '현재', 점수: oldScore },
        { compare: '변경', 점수: newScore },
    ];

    return (
        <ScoreGraph 
            title="RQ"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 RQ"
            oldRank={oldRank}
            newRank={newRank}
        />
    );
}

// CQGraph 컴포넌트
export function CQGraph({ oldScore, newScore, oldRank, newRank }) {
    const data = [
        { compare: '현재', 점수: oldScore },
        { compare: '변경', 점수: newScore },
    ];

    return (
        <ScoreGraph 
            title="CQ"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 CQ"
            oldRank={oldRank}
            newRank={newRank}
        />
    );
}

// TotalGraph 컴포넌트
export function TotalGraph({ oldScore, newScore, oldRank, newRank }) {
    const data = [
        { compare: '현재', 점수: oldScore },
        { compare: '변경', 점수: newScore },
    ];

    return (
        <ScoreGraph 
            title="TOTAL"
            data={data}
            gradientAColor="#0E341B"  // 진한 초록
            gradientBColor="#FF6C0F"  // 오렌지
            legend="조정 총점"
            oldRank={oldRank}
            newRank={newRank}
        />
    );
}
