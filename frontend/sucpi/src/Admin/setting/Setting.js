import React, { useState, useEffect } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';

export function Setting() {
    const [ratios, setRatios] = useState(null);
    const [comparisonRatios, setComparisonRatios] = useState(null);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        // Fetching data from the settings API
        fetch('http://localhost:8080/api/admin/settings')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const result = data.result;
                    setRatios({
                        prev_LQratio: result.prev_LQratio,
                        prev_RQratio: result.prev_RQratio,
                        prev_CQratio: result.prev_CQratio,
                        temp_LQratio: result.temp_LQratio,
                        temp_RQratio: result.temp_RQratio,
                        temp_CQratio: result.temp_CQratio,
                        prev_avgQ: result.prev_avgQ || {}  // Ensure prev_avgQ is always defined
                    });
                    setComparisonRatios({
                        compareLQ: result.temp_LQratio,
                        compareRQ: result.temp_RQratio,
                        compareCQ: result.temp_CQratio
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
    // Ensure prev_avgQ is always safely destructured
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
            <DetailSetting data={detailData} />
            <CompareGraph ratios={graphRatios} comparisonRatios={comparisonRatios} />
        </div>
    );
}