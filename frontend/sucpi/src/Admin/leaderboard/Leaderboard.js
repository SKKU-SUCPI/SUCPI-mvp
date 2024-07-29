import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";


export function Leaderboard()
{
    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>리더보드</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            <FilterTable />
            <h3 style={{padding:"48px 36px 12px"}}>순위</h3>
            <Rank />
        </div>
    );
}