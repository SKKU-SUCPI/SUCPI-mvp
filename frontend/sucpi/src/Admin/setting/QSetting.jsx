import React, { useState, useEffect } from 'react';
import { compareRatios, saveRatios } from '../../api';
import './QSetting.css';

export function QSetting({ initialRatios, setRatios, setComparisonRatios }) {
    const [overallRatios, setOverallRatios] = useState({
        LQ: initialRatios.prev_LQratio,
        RQ: initialRatios.prev_RQratio,
        CQ: initialRatios.prev_CQratio
    });

    const [comparisonRatiosLocal, setComparisonRatiosLocal] = useState({
        temp_LQratio: initialRatios.temp_LQratio,
        temp_RQratio: initialRatios.temp_RQratio,
        temp_CQratio: initialRatios.temp_CQratio
    });

    const handleRatioChange = (event) => {
        const { name, value } = event.target;
        setOverallRatios((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }));
    };

    const handleComparisonChange = (event) => {
        const { name, value } = event.target;
        setComparisonRatiosLocal((prevState) => ({
            ...prevState,
            [name]: parseFloat(value) || 0,
        }));
    };

    const handleCompareClick = async () => {
        try {
            const result = await compareRatios({
                lqRatio: comparisonRatiosLocal.temp_LQratio,
                rqRatio: comparisonRatiosLocal.temp_RQratio,
                cqRatio: comparisonRatiosLocal.temp_CQratio,
            });

            const updatedComparisonRatios = {
                temp_LQ_avg: result.temp_avgQ.temp_LQ_avg,
                temp_RQ_avg: result.temp_avgQ.temp_RQ_avg,
                temp_CQ_avg: result.temp_avgQ.temp_CQ_avg,
            };

            setComparisonRatios(updatedComparisonRatios);
            console.log('Updated comparisonRatios:', updatedComparisonRatios);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSaveClick = async () => {
        try {
            const result = await saveRatios({
                lqRatio: comparisonRatiosLocal.temp_LQratio,
                rqRatio: comparisonRatiosLocal.temp_RQratio,
                cqRatio: comparisonRatiosLocal.temp_CQratio,
            });

            setOverallRatios({
                LQ: result.prev_LQratio,
                RQ: result.prev_RQratio,
                CQ: result.prev_CQratio,
            });

            setRatios({
                prev_LQratio: result.prev_LQratio,
                prev_RQratio: result.prev_RQratio,
                prev_CQratio: result.prev_CQratio,
                prev_avgQ: result.prev_avgQ,
            });

            setComparisonRatiosLocal({
                temp_LQratio: result.temp_LQratio,
                temp_RQratio: result.temp_RQratio,
                temp_CQratio: result.temp_CQratio,
            });

            setComparisonRatios({
                temp_LQ_avg: result.temp_avgQ.temp_LQ_avg,
                temp_RQ_avg: result.temp_avgQ.temp_RQ_avg,
                temp_CQ_avg: result.temp_avgQ.temp_CQ_avg,
            });

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
                            name="temp_LQratio" 
                            value={comparisonRatiosLocal.temp_LQratio} 
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
                            name="temp_RQratio" 
                            value={comparisonRatiosLocal.temp_RQratio} 
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
                            name="temp_CQratio" 
                            value={comparisonRatiosLocal.temp_CQratio} 
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