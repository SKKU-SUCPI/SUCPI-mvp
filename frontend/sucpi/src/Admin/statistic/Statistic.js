import { FilterTable } from "../../components/FilterTable/FilterTable";

export function Statistic()
{
    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>통계</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            <FilterTable />
            <h3 style={{padding:"48px 36px 12px"}}>그래프</h3>
        </div>
    );
}