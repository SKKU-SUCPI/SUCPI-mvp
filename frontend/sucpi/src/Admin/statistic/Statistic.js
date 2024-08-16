import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/Graph/BarGraph/BarChart";
import { DepartmentChart } from "../../components/Graph/PieGraph/DepartmentChart";
import { GradeChart } from "../../components/Graph/PieGraph/GradeChart";
import { ThreeQChart } from "../../components/Graph/PieGraph/ThreeQChart";
import { StatisticFilter } from "./StatisticFilter.js";
import { useLocation } from "react-router-dom";

export function Statistic() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const location = useLocation();

    const fetchData = (query = '') => {
        fetch(`http://localhost:8080/api/admin/statistics${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 접속 불량입니다.')
                }
                return response.json();
            })
            .then(data => {
                setData(data.result);
                setFilteredData(data.result);
                processBarChartData(data.result);
            })
            .catch(error => {
                console.error('에러 -> ', error);
            });
    };

    useEffect(() => {
        // 쿼리 스트링이 변경될 때마다 데이터를 가져옴
        fetchData(location.search);
    }, [location.search]);

    const processBarChartData = (result) => {
        const lqStatistics = Object.keys(result.lqStatistics).map(key => ({
            index: key,
            value: result.lqStatistics[key],
            category: 'LQ'
        }));

        const rqStatistics = Object.keys(result.rqStatistics).map(key => ({
            index: key,
            value: result.rqStatistics[key],
            category: 'RQ'
        }));

        const cqStatistics = Object.keys(result.cqStatistics).map(key => ({
            index: key,
            value: result.cqStatistics[key],
            category: 'CQ'
        }));

        // 모든 데이터를 결합
        const combinedData = [...lqStatistics, ...rqStatistics, ...cqStatistics];

        setBarChartData(combinedData);
    };

    return (
        <div>
            <h1 style={{ padding: "16px 36px 12px" }}>통계</h1>
            <h3 style={{ padding: "32px 36px 12px" }}>필터</h3>
            <StatisticFilter data={data} setFilteredData={setFilteredData} />
            <h3 style={{ padding: "48px 36px 12px" }}>그래프</h3>
            <div className="charts-container">
                <ThreeQChart data={data}/>
                <DepartmentChart data={data}/>
                <GradeChart data={data}/>
            </div>
            <div style={{ padding: "6px" }}>
                <BarChart data={barChartData} />
            </div>
        </div>
    );
}
