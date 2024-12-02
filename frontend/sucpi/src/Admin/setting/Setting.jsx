import React, { useState, useEffect } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';
import { fetchSettings, fetchWeights } from '../../api';

export function Setting() {
    const [ratios, setRatios] = useState(null);
    const [comparisonRatios, setComparisonRatios] = useState(null);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const settingsData = await fetchSettings();
                const weightsData = await fetchWeights();

                setRatios({
                    prev_LQratio: settingsData.prev_LQratio,
                    prev_RQratio: settingsData.prev_RQratio,
                    prev_CQratio: settingsData.prev_CQratio,
                    prev_avgQ: settingsData.prev_avgQ || {},
                });

                setComparisonRatios(settingsData.temp_avgQ || {});
                setDetailData(weightsData);
            } catch (error) {
                console.error('Error loading data:', error.message);
            }
        };

        loadData();
    }, []);

    if (!ratios || !comparisonRatios || !detailData) {
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
            <h1 style={{ padding: "16px 36px 12px" }}>설정</h1>
            <QSetting initialRatios={ratios} setRatios={setRatios} setComparisonRatios={setComparisonRatios} />
            <DetailSetting data={detailData} setComparisonRatios={setComparisonRatios} />
            <CompareGraph ratios={graphRatios} comparisonRatios={comparisonRatios} />
        </div>
    );
}