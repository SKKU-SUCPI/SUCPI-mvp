import React, { useEffect, useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";

export function Leaderboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        // API 요청
        fetch("http://siop-dev.skku.edu:8080/api/admin/leaderboard", {
            method: "GET",
            mode: "cors", // CORS 요청 명시
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error("Fetch error:", error));
    }, []);

    return (
        <div>
            <h1 style={{ padding: "16px 36px 12px" }}>리더보드</h1>
            {error ? (
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