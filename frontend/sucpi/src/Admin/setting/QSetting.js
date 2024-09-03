import React, { useState, useEffect } from 'react';
import './QSetting.css';

export function QSetting({ initialRatios, setRatios, setComparisonRatios }) {
    const [overallRatios, setOverallRatios] = useState({
        LQ: initialRatios.prev_LQratio,
        RQ: initialRatios.prev_RQratio,
        CQ: initialRatios.prev_CQratio
    });

    const [comparisonRatios, setComparisonRatiosLocal] = useState({
        compareLQ: initialRatios.temp_LQratio,
        compareRQ: initialRatios.temp_RQratio,
        compareCQ: initialRatios.temp_CQratio
    });

    const handleRatioChange = (event) => {
        const { name, value } = event.target;
        setOverallRatios(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    };

    const handleComparisonChange = (event) => {
        const { name, value } = event.target;
        setComparisonRatiosLocal(prevState => ({
            ...prevState,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleCompareClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/settings/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lqRatio: comparisonRatios.compareLQ,
                    rqRatio: comparisonRatios.compareRQ,
                    cqRatio: comparisonRatios.compareCQ
                })
            });

            if (!response.ok) {
                throw new Error('비교를 수행하는 데 실패했습니다.');
            }

            const data = await response.json();
            if (data.status === 200) {
                const tempAvgQ = data.result.temp_avgQ;
                setComparisonRatios({
                    compareLQ: tempAvgQ.temp_LQ_avg,
                    compareRQ: tempAvgQ.temp_RQ_avg,
                    compareCQ: tempAvgQ.temp_CQ_avg
                });
            } else {
                throw new Error(data.message || '비교를 수행하는 데 실패했습니다.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSaveClick = async () => {
        const ratiosToSave = {
            prev_LQratio: comparisonRatios.compareLQ,
            prev_RQratio: comparisonRatios.compareRQ,
            prev_CQratio: comparisonRatios.compareCQ
        };

        try {
            const response = await fetch('http://localhost:8080/api/admin/settings/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ratiosToSave)
            });

            if (!response.ok) {
                throw new Error('비율 설정을 저장하는 데 실패했습니다.');
            }

            setOverallRatios({
                LQ: ratiosToSave.prev_LQratio,
                RQ: ratiosToSave.prev_RQratio,
                CQ: ratiosToSave.prev_CQratio
            });

            setRatios(ratiosToSave);

            alert('비율 설정이 성공적으로 저장되었습니다.');
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        setRatios(overallRatios);
    }, [overallRatios, setRatios]);

    return (
        <div className="qsetting-container">
            <div className='qsetting-container-header'>
                <h3>전체 비율</h3>
                <button className="button-save" onClick={handleSaveClick}>저장</button>
            </div>
            <div className="qsetting-ratio-container">
                <div className="current-ratio">
                    <h4>현재 비율</h4>
                    <div className="qs-input-group">
                        <label>LQ</label>
                        <input 
                            type="text" 
                            name="LQ" 
                            value={overallRatios.LQ} 
                            onChange={handleRatioChange} 
                            className="input-field"
                            inputMode="numeric"
                            disabled
                        />
                    </div>
                    <div className="qs-input-group">
                        <label>RQ</label>
                        <input 
                            type="text" 
                            name="RQ" 
                            value={overallRatios.RQ} 
                            onChange={handleRatioChange} 
                            className="input-field"
                            inputMode="numeric"
                            disabled
                        />
                    </div>
                    <div className="qs-input-group">
                        <label>CQ</label>
                        <input 
                            type="text" 
                            name="CQ" 
                            value={overallRatios.CQ} 
                            onChange={handleRatioChange} 
                            className="input-field"
                            inputMode="numeric"
                            disabled
                        />
                    </div>
                </div>
                <div className="compare-ratio">
                    <h4>비교하기</h4>
                    <div className="qs-input-group">
                        <label>LQ</label>
                        <input 
                            type="text" 
                            name="compareLQ" 
                            value={comparisonRatios.compareLQ} 
                            onChange={handleComparisonChange} 
                            className="input-field"
                            inputMode="numeric"
                            placeholder='비율을 입력해주세요.'
                        />
                    </div>
                    <div className="qs-input-group">
                        <label>RQ</label>
                        <input 
                            type="text" 
                            name="compareRQ" 
                            value={comparisonRatios.compareRQ} 
                            onChange={handleComparisonChange} 
                            className="input-field"
                            inputMode="numeric"
                            placeholder='비율을 입력해주세요.'
                        />
                    </div>
                    <div className="qs-input-group">
                        <label>CQ</label>
                        <input 
                            type="text" 
                            name="compareCQ" 
                            value={comparisonRatios.compareCQ} 
                            onChange={handleComparisonChange} 
                            className="input-field"
                            inputMode="numeric"
                            placeholder='비율을 입력해주세요.'
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button className="button-secondary" onClick={handleCompareClick}>비교</button>
                </div>
            </div>
        </div>
    );
}