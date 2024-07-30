// /components/QSetting.js
import React, { useState } from 'react';
import './QSetting.css';

export function QSetting({ initialRatios }) {
    const [overallRatios, setOverallRatios] = useState({
        LQ: initialRatios.lqRatio,
        RQ: initialRatios.rqRatio,
        CQ: initialRatios.cqRatio
    });

    const handleRatioChange = (event) => {
        const { name, value } = event.target;
        setOverallRatios(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    };

    return (
        <div className="qsetting-container">
            <div className='qsetting-container-column'>
                <h3>전체 비율</h3>
                <button className="button-save">저장</button>
            </div>
            <div className="table-container">
                <div className="input-group">
                    <label>LQ</label>
                    <input 
                        type="text" 
                        name="LQ" 
                        value={overallRatios.LQ} 
                        onChange={handleRatioChange} 
                        className="input-field"
                        inputMode="numeric"  // 모바일 환경에서 숫자 키패드가 표시되도록 함
                    />
                </div>
                <div className="input-group">
                    <label>RQ</label>
                    <input 
                        type="text" 
                        name="RQ" 
                        value={overallRatios.RQ} 
                        onChange={handleRatioChange} 
                        className="input-field"
                        inputMode="numeric"  // 모바일 환경에서 숫자 키패드가 표시되도록 함
                    />
                </div>
                <div className="input-group">
                    <label>CQ</label>
                    <input 
                        type="text" 
                        name="CQ" 
                        value={overallRatios.CQ} 
                        onChange={handleRatioChange} 
                        className="input-field"
                        inputMode="numeric"  // 모바일 환경에서 숫자 키패드가 표시되도록 함
                    />
                </div>
                <div className="button-group">
                    {/* <button className="button-secondary">추가</button>
                    <button className="button-secondary">삭제</button> */}
                    <button className="button-secondary">비교</button>
                </div>
            </div>
        </div>
    );
}
