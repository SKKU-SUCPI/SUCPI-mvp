// FilterTable.jsx

// 버튼 로직부터 다시 하기
import React, { useState } from 'react';
import './FilterTable.css';

export function FilterTable() {
    const [sucpi, setSucpi] = useState([]);
    const [grade, setGrade] = useState([]);
    const [department, setDepartment] = useState([]);

    const allSucpiOptions = ['전체', 'LQ', 'CQ', 'RQ'];
    const allGradeOptions = ['전체', '1', '2', '3', '4', '5+'];
    const allDepartmentOptions = ['전체', '소프트웨어학과', '글로벌융합학부', '지능형 소프트웨어학과'];

    const handleButtonClick = (category, setCategory, value, allOptions) => {
        setCategory(prevState => {
            let newState;
            if (value === '전체') {
                newState = prevState.includes(value) ? [] : ['전체'];
            } else {
                if (prevState.includes(value)) {
                    newState = prevState.filter(item => item !== value);
                } else {
                    newState = [...prevState, value].filter(item => item !== '전체');
                }
            }

            // If all options except "전체" are selected, activate "전체" and deactivate others
            if (newState.length === allOptions.length - 1) {
                return ['전체'];
            }

            return newState;
        });
    };

    const renderButtons = (category, setCategory, options) => (
        options.map(option => (
            <button
                key={option}
                className={`btn ${category.includes(option) ? 'active' : ''}`}
                onClick={() => handleButtonClick(category, setCategory, option, options)}
            >
                {option}
            </button>
        ))
    );

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>SUCPI</th>
                        <td>
                            {renderButtons(sucpi, setSucpi, allSucpiOptions)}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>학년</th>
                        <td>
                            {renderButtons(grade, setGrade, allGradeOptions)}
                        </td>
                    </tr>
                    <tr>
                        <th>학과</th>
                        <td>
                            {renderButtons(department, setDepartment, allDepartmentOptions)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
