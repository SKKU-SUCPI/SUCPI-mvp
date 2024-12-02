import React, { useEffect, useState } from "react";
import { fetchWeights, fetchGraphData, postComparisonData } from '../../../api'; // API 함수 가져오기
import './CompareGraph.css';
import { CompareDetailSetting } from "./CompareDetailSetting";
import { LQGraph, RQGraph, CQGraph, TotalGraph } from './GraphComponents'; // 그래프 컴포넌트 import

export function CompareGraph({ studentId }) {
    const [scoreData, setScoreData] = useState(null); // 그래프 데이터
    const [detailData, setDetailData] = useState(null); // 가중치 데이터
    const [error, setError] = useState(null); // 에러 상태 추가

    // 초기 데이터 로드
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const weights = await fetchWeights();
                setDetailData(weights);

                const graphData = await fetchGraphData(studentId);
                setScoreData(graphData);
            } catch (err) {
                setError(err.message); // 에러 메시지 저장
                console.error('Error fetching initial data:', err);
            }
        };

        loadInitialData();
    }, [studentId]);

    // 비교하기 버튼 클릭 시 호출되는 함수
    const handleCompareClick = async (updatedData) => {
        if (updatedData) {
            try {
                console.log("Sending data:", updatedData);
                const updatedGraphData = await postComparisonData(studentId, updatedData);
                setScoreData(updatedGraphData); // 업데이트된 그래프 데이터 설정
            } catch (err) {
                setError(err.message); // 에러 메시지 저장
                console.error('Error sending comparison data:', err);
            }
        }
    };

    // 에러 처리
    if (error) {
        return <div className="error-message">오류 발생: {error}</div>;
    }

    return (
        <>
            <CompareDetailSetting data={detailData} onCompareClick={handleCompareClick} />
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
