import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/Graph/BarGraph/BarChart";
import { DepartmentChart } from "../../components/Graph/PieGraph/DepartmentChart";
import { GradeChart } from "../../components/Graph/PieGraph/GradeChart";
import { ThreeQChart } from "../../components/Graph/PieGraph/ThreeQChart";
import { StatisticFilter } from "./StatisticFilter.js";
import { useLocation } from "react-router-dom";
import { fetchStatistics } from "../../api";

export function Statistic() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const location = useLocation();

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

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                const result = await fetchStatistics(location.search); // API 호출
                setData(result);
                setFilteredData(result);
                processBarChartData(result);
            } catch (error) {
                console.error('Error fetching statistics:', error.message);
            }
        };

        // 쿼리 스트링이 변경될 때마다 데이터를 가져옴
        loadStatistics();
    }, [location.search]);

    return (
        <div>
            <h1 style={{ padding: "16px 36px 12px" }}>통계</h1>
            <h3 style={{ padding: "32px 36px 12px" }}>필터</h3>
            <StatisticFilter data={data} setFilteredData={setFilteredData} />
            <h3 style={{ padding: "48px 36px 12px" }}>그래프</h3>
            <div className="charts-container">
                <ThreeQChart data={data} />
                <DepartmentChart data={data} />
                <GradeChart data={data} />
            </div>
            <div style={{ padding: "6px" }}>
                <BarChart data={barChartData} />
            </div>
        </div>
    );
}