import React, { useState, useEffect } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';

export function Setting() {
    const [ratios, setRatios] = useState(null);
    const [comparisonRatios, setComparisonRatios] = useState(null);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        // 데이터 가져오기
        fetch('http://localhost:8080/api/admin/settings')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const result = data.result[0];
                    setRatios(result);
                    setComparisonRatios({
                        compareLQ: result.lqRatio,
                        compareRQ: result.rqRatio,
                        compareCQ: result.cqRatio
                    });
                } else {
                    console.error('Error retrieving data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

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

    if (!ratios || !comparisonRatios) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>설정</h1>
            <QSetting initialRatios={ratios} setRatios={setRatios} setComparisonRatios={setComparisonRatios} />
            <DetailSetting data={detailData} />
            <CompareGraph ratios={ratios} comparisonRatios={comparisonRatios} />
        </div>
    );
}