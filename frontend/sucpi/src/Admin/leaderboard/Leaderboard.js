import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";


export function Leaderboard()
{
    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>리더보드</h1>
            <FilterTable />
            <Rank />
        </div>
    );
}