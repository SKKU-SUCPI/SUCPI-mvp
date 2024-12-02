import React, { useState, useEffect } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { saveWeights, compareWeights } from "../../api";
import './DetailSetting.css';

export function DetailSetting({ data, setComparisonRatios }) { // setComparisonRatios를 props로 받아옵니다.
    const [selected, setSelected] = useState('');
    const [weights, setWeights] = useState({ LQ: {}, RQ: {}, CQ: {} });
    const [savedWeights, setSavedWeights] = useState({ LQ: {}, RQ: {}, CQ: {} });

    useEffect(() => {
        if (data) {
            const initialWeights = {
                LQ: data.lqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
                RQ: data.rqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
                CQ: data.cqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
            };
            setWeights(initialWeights);
            setSavedWeights(initialWeights);
        }
    }, [data]);

    const handleToggle = (type) => {
        setSelected((prevSelected) => (prevSelected === type ? '' : type));
    };

    const handleWeightChange = (type, id, newWeight) => {
        const numericWeight = parseInt(newWeight, 10) || 0;

        setWeights((prevWeights) => ({
            ...prevWeights,
            [type]: {
                ...prevWeights[type],
                [id]: numericWeight,
            },
        }));
    };

    const handleSaveClick = async () => {
        const payload = {
            lqweights: data.lqweights.map((item) => ({
                ...item,
                weight: weights.LQ[item.id] || item.weight,
            })),
            rqweights: data.rqweights.map((item) => ({
                ...item,
                weight: weights.RQ[item.id] || item.weight,
            })),
            cqweights: data.cqweights.map((item) => ({
                ...item,
                weight: weights.CQ[item.id] || item.weight,
            })),
        };

        try {
            await saveWeights(payload);
            alert('Weights have been saved successfully.');

            setSavedWeights({
                LQ: payload.lqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
                RQ: payload.rqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
                CQ: payload.cqweights.reduce((acc, item) => {
                    acc[item.id] = item.weight;
                    return acc;
                }, {}),
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleComparisonClick = async () => {
        const payload = {
            lqweights: data.lqweights.map((item) => ({
                ...item,
                weight: weights.LQ[item.id] || item.weight,
            })),
            rqweights: data.rqweights.map((item) => ({
                ...item,
                weight: weights.RQ[item.id] || item.weight,
            })),
            cqweights: data.cqweights.map((item) => ({
                ...item,
                weight: weights.CQ[item.id] || item.weight,
            })),
        };

        try {
            const result = await compareWeights(payload);
            const tempAvgQ = result.result?.tempAvgQ || {};
            setComparisonRatios({
                temp_LQ_avg: tempAvgQ.tempLQAvg || 0,
                temp_CQ_avg: tempAvgQ.tempCQAvg || 0,
                temp_RQ_avg: tempAvgQ.tempRQAvg || 0,
            });
            alert('Comparison has been successfully performed.');
        } catch (error) {
            alert(error.message);
        }
    };

    const selectedWeights = data && selected ? data[selected.toLowerCase() + 'weights'] : null;

    return (
        <div className="detail-setting-container">
            <div className="detail-setting-header">
                <h3>세부 항목</h3>
                <div className="detail-button-group">
                    <button className="button-save" style={{ backgroundColor: "#3C3C3C" }}>점수표</button>
                    <button className="button-save" onClick={handleSaveClick}>저장</button>
                </div>
            </div>
            <div className="table-container">
                <div className="detail-input-group">
                    <span>LQ</span>
                    <button
                        className={`toggle-button ${selected === 'LQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('LQ')}
                    >
                        {selected === 'LQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>

                <div className="detail-input-group">
                    <span>RQ</span>
                    <button
                        className={`toggle-button ${selected === 'RQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('RQ')}
                    >
                        {selected === 'RQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>

                <div className="detail-input-group">
                    <span>CQ</span>
                    <button
                        className={`toggle-button ${selected === 'CQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('CQ')}
                    >
                        {selected === 'CQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>

                <div className="detail-button-group">
                    <button className="button-secondary" onClick={handleComparisonClick}>비교</button>
                </div>
            </div>

            {selected && selectedWeights && (
                <div className="detail-table">
                    <table className="detail-table-table">
                        <thead>
                            <tr>
                                <th className="detail-table-th">구분</th>
                                <th className="detail-table-th">산출 기준</th>
                                <th className="detail-table-th">점수</th>
                                <th className="detail-table-th" style={{ backgroundColor: "#8DC63F" }}>점수 수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedWeights.map((row) => (
                                <tr key={row.id}>
                                    <td className="detail-table-td">{row.category}</td>
                                    <td className="detail-table-td">{row.name}</td>
                                    <td className="detail-table-td">{savedWeights[selected][row.id]}</td>
                                    <td className="detail-table-td">
                                        <input 
                                            type="text" 
                                            value={weights[selected][row.id] || row.weight} 
                                            onChange={(e) => handleWeightChange(selected, row.id, e.target.value)}
                                            style={{ width: "68px", textAlign: "right" }} 
                                        /> 점
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}