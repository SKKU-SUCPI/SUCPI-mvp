import { FilterTable } from "../../components/FilterTable/FilterTable";
import { BarChart } from "../../components/Graph/BarGraph/BarChart";
import { DepartmentChart } from "../../components/Graph/PieGraph/DepartmentChart";
import { GradeChart } from "../../components/Graph/PieGraph/GradeChart";
import { ThreeQChart } from "../../components/Graph/PieGraph/ThreeQChart";
import { barChartData } from "../../components/Graph/BarGraph/data.js";
import { StatisticFilter } from "./StatisticFilter.js";
import { useEffect, useState } from "react";

export function Statistic()
{
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/statistics")
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 접속 불량입니다.')
                }
                return response.json();
            })
            .then(data => {
                setData(data.result);
                setFilteredData(data.result);
            })
            .catch(error => {
                console.error('에러 -> ', error);
            });
    }, []);

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>통계</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            {/* 추후 진행 */}
            <StatisticFilter data={data} setFilteredData={setFilteredData} />
            <h3 style={{padding:"48px 36px 12px"}}>그래프</h3>
            <div className="charts-container">
                <ThreeQChart />
                <DepartmentChart />
                <GradeChart />
            </div>
            <div style={{padding: "6px"}}>
                <BarChart data={barChartData} />
            </div>
        </div>
    );
}