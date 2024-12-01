import React, { useEffect, useState } from "react";
import { fetchLeaderboardData } from "../../api/api";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";

export function Leaderboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchLeaderboardData()
            .then((result) => {
                setData(result);
                setFilteredData(result);
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1 style={{ padding: "16px 36px 12px" }}>리더보드</h1>
            {isLoading ? (
                <p style={{ padding: "16px 36px" }}>로딩 중...</p>
            ) : error ? (
                <p style={{ color: "red", padding: "16px 36px" }}>
                    데이터를 가져오는 중 문제가 발생했습니다: {error}
                </p>
            ) : (
                <>
                    <h3 style={{ padding: "32px 36px 12px" }}>필터</h3>
                    <FilterTable data={data} setFilteredData={setFilteredData} />
                    <h3 style={{ padding: "48px 36px 12px" }}>순위</h3>
                    <Rank data={filteredData} />
                </>
            )}
        </div>
    );
}
