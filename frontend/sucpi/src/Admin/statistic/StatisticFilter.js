import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function StatisticFilter({ data, setFilteredData }) {
    const [sucpi, setSucpi] = useState(['전체']);
    const [grade, setGrade] = useState(['전체']);
    const [department, setDepartment] = useState(['전체']);
    const navigate = useNavigate();
    const location = useLocation();

    const allSucpiOptions = ['전체', 'LQ', 'RQ', 'CQ'];
    const allGradeOptions = ['전체', '1', '2', '3', '4', '5'];
    const allDepartmentOptions = ['전체', '소프트웨어학과', '글로벌융합학부', '지능형소프트웨어학과'];

    const departmentMapping = {
        '소프트웨어학과': 'SW',
        '글로벌융합학부': 'GC',
        '지능형소프트웨어학과': 'AI',
    };

    const handleButtonClick = (category, setCategory, value) => {
        const newState = (prevState) => {
            if (value === '전체') {
                return prevState.includes(value) ? [] : ['전체'];
            } else {
                if (prevState.includes(value)) {
                    return prevState.filter(item => item !== value);
                } else {
                    return [...prevState, value].filter(item => item !== '전체');
                }
            }
        };
        setCategory(newState);
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
        const queryParams = new URLSearchParams(location.search);

        if (sucpi.length > 0 && !sucpi.includes('전체')) {
            queryParams.set('Q', sucpi.map(q => q.toLowerCase()).join(','));
        } else {
            queryParams.delete('Q');
        }

        if (grade.length > 0 && !grade.includes('전체')) {
            queryParams.set('Grade', grade.join(','));
        } else {
            queryParams.delete('Grade');
        }

        navigate({ search: queryParams.toString() }, { replace: true });

    }, [sucpi, grade, navigate, location.search]);

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
