import React, { useState, useEffect } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';

export function Setting() {
    const [ratios, setRatios] = useState(null);
    const [comparisonRatios, setComparisonRatios] = useState(null);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/settings')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const result = data.result;
                    setRatios({
                        prev_LQratio: result.prev_LQratio,
                        prev_RQratio: result.prev_RQratio,
                        prev_CQratio: result.prev_CQratio,
                        prev_avgQ: result.prev_avgQ || {}  
                    });
                    setComparisonRatios(result.temp_avgQ || {}); // temp_avgQ를 직접 comparisonRatios로 설정
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

    const { prev_avgQ = {} } = ratios;
    const graphRatios = {
        prev_LQ_avg: prev_avgQ.prev_LQ_avg,
        prev_RQ_avg: prev_avgQ.prev_RQ_avg,
        prev_CQ_avg: prev_avgQ.prev_CQ_avg,
    };

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>설정</h1>
            <QSetting initialRatios={ratios} setRatios={setRatios} setComparisonRatios={setComparisonRatios} />
            <DetailSetting data={detailData} setComparisonRatios={setComparisonRatios} />
            <CompareGraph ratios={graphRatios} comparisonRatios={comparisonRatios} />
        </div>
    );
}