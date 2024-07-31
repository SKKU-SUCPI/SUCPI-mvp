import React, { useState, useEffect } from 'react';
import './QSetting.css';

export function QSetting({ initialRatios, setRatios, setComparisonRatios }) {
    const [overallRatios, setOverallRatios] = useState({
        LQ: initialRatios.lqRatio,
        RQ: initialRatios.rqRatio,
        CQ: initialRatios.cqRatio
    });

    const [comparisonRatios, setComparisonRatiosLocal] = useState({
        compareLQ: initialRatios.lqRatio,
        compareRQ: initialRatios.rqRatio,
        compareCQ: initialRatios.cqRatio
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

    const handleCompareClick = () => {
        setComparisonRatios(comparisonRatios);
    };

    useEffect(() => {
        setRatios(overallRatios);
    }, [overallRatios, setRatios]);

    return (
        <div className="qsetting-container">
            <div className='qsetting-container-header'>
                <h3>전체 비율</h3>
                <button className="button-save">저장</button>
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