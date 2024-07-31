import { FilterTable } from "../../components/FilterTable/FilterTable";
import { BarChart } from "../../components/Graph/BarGraph/BarChart";
import { DepartmentChart } from "../../components/Graph/PieGraph/DepartmentChart";
import { GradeChart } from "../../components/Graph/PieGraph/GradeChart";
import { ThreeQChart } from "../../components/Graph/PieGraph/ThreeQChart";
import { barChartData } from "../../components/Graph/BarGraph/data.js";

export function Statistic()
{
    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>통계</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            {/* 추후 진행 */}
            {/* <FilterTable /> */}
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