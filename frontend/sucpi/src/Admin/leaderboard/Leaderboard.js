import React, { useEffect, useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";

export function Leaderboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://siop-dev.skku.edu:4502/api/admin/leaderboard", {
            method: "GET",
            mode: "cors",
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
        .then(data => {
            console.log("Fetched data:", data); // 데이터 확인
            setData(data.data || []); // API 응답에 맞게 설정
            setFilteredData(data.data || []); // 초기 필터 데이터 설정
        })
        .catch(error => setError(error.message));
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
