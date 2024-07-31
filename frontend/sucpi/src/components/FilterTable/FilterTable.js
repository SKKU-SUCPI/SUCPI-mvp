import React, { useState, useEffect } from 'react';
import './FilterTable.css';

export function FilterTable({ data, setFilteredData }) {
    const [sucpi, setSucpi] = useState(['전체']);
    const [grade, setGrade] = useState(['전체']);
    const [department, setDepartment] = useState(['전체']);

    const allSucpiOptions = ['전체', 'LQ', 'CQ', 'RQ'];
    const allGradeOptions = ['전체', '1', '2', '3', '4', '5+'];
    const allDepartmentOptions = ['전체', '소프트웨어학과', '글로벌융합학부', '지능형소프트웨어학과'];

    const handleButtonClick = (category, setCategory, value) => {
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

            return newState;
        });
    };

    const renderButtons = (category, setCategory, options) => (
        options.map(option => (
            <button
                key={option}
                className={`btn ${category.includes(option) ? 'active' : ''}`}
                onClick={() => handleButtonClick(category, setCategory, option)}
            >
                {option}
            </button>
        ))
    );

    useEffect(() => {
        let filteredData = data;

        // Grade filtering
        if (!grade.includes('전체')) {
            filteredData = filteredData.filter(item => grade.includes(item.studentGrade.toString()));
        }

        // Additional filtering logic can be added here for SUCPI and department
        
        setFilteredData(filteredData);
    }, [grade, data, setFilteredData]);

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
