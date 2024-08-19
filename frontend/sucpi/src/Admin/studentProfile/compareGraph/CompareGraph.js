import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar';

import './CompareGraph.css'
import { CompareDetailSetting } from "./CompareDetailSetting";

export function CompareGraph({ studentId }) {
    const [scoreData, setScoreData] = useState(null);
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

        // 그래프에 대한 값 불러오기
        fetch(`http://localhost:8080/api/admin/weights/test/${studentId}`)
            .then(response => response.json())
            .then(data => {
                setScoreData(data);
            })
            .catch(error => {
                console.error('Error ', error);
            });
    }, [studentId]);

    return (
        <>
            <CompareDetailSetting data={detailData} />
            <hr className="divider" />
            <div className="compare-graph-container">
                {scoreData && (
                    <>
                        <LQGraph 
                            oldScore={scoreData.oldScore.oldLqScore} 
                            newScore={scoreData.newScore.newLqScore} 
                            oldRank={scoreData.oldRank.oldRankLq} 
                            newRank={scoreData.newRank.newRankLq} 
                        />
                        <RQGraph 
                            oldScore={scoreData.oldScore.oldRqScore} 
                            newScore={scoreData.newScore.newRqScore} 
                            oldRank={scoreData.oldRank.oldRankRq} 
                            newRank={scoreData.newRank.newRankRq} 
                        />
                        <CQGraph 
                            oldScore={scoreData.oldScore.oldCqScore} 
                            newScore={scoreData.newScore.newCqScore} 
                            oldRank={scoreData.oldRank.oldRankCq} 
                            newRank={scoreData.newRank.newRankCq} 
                        />
                        <TotalGraph 
                            oldScore={scoreData.oldScore.oldTotalScore} 
                            newScore={scoreData.newScore.newTotalScore} 
                            oldRank={scoreData.oldRank.oldRankTotal} 
                            newRank={scoreData.newRank.newRankTotal} 
                        />
                    </>
                )}
            </div>
        </>
    );
}

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
            <RankBox oldRank={oldRank} newRank={newRank} />
        </div>
    );
}

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

export function RankBox({ oldRank, newRank }) {
    const rankDifference = oldRank - newRank;
    const isPositive = rankDifference > 0; // 등수가 올라갔으면 positive, 내려갔으면 negative

    return (
        <div className="rank-box">
            <span className="rank" style={{ fontWeight: "bold" }}>
                {oldRank}등
            </span>
        </div>
    );
}
