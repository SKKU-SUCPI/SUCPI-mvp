import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import './DetailSetting.css';

export function DetailSetting({ data }) {
    const [selected, setSelected] = useState('');
    const [weights, setWeights] = useState({});

    const handleToggle = (type) => {
        setSelected(prevSelected => (prevSelected === type ? '' : type));
    };

    const handleWeightChange = (id, newWeight) => {
        setWeights(prevWeights => ({
            ...prevWeights,
            [id]: newWeight
        }));
    };

    const selectedWeights = data && selected ? data[selected.toLowerCase() + 'weights'] : null;

    return (
        <div className="detail-setting-container">
            <div className="detail-setting-header">
                <h3>세부 항목</h3>
                <div className="detail-button-group">
                    <button className="button-save" style={{ backgroundColor: "#3C3C3C" }}>점수표</button>
                    <button className="button-save">저장</button>
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
                    <button className="button-secondary">비교</button>
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
                                    <td className="detail-table-td">{row.weight}</td>
                                    <td className="detail-table-td">
                                        <input 
                                            type="text" 
                                            value={weights[row.id] || row.weight} 
                                            onChange={(e) => handleWeightChange(row.id, e.target.value)}
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
