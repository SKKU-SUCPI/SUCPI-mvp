import React, { useEffect, useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";

// API Base URL을 환경에 따라 변경 가능하도록 설정
const baseURL = process.env.NODE_ENV === "production" 
    ? "http://siop-dev.skku.edu/api/admin/leaderboard" 
    : "http://localhost:8080/api/admin/leaderboard";

export function Leaderboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        // API 요청
        fetch(baseURL, {
            credentials: "include", // CORS 쿠키 포함을 위한 옵션
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.result) {
                    setData(data.result); // API에서 받은 데이터를 상태에 저장
                    setFilteredData(data.result); // 초기 필터된 데이터로 설정
                } else {
                    throw new Error("Invalid API response structure");
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
                setError(error.message); // 에러 상태 업데이트
            });
    }, []);

    return (
        <div>
            <h1 style={{ padding: "16px 36px 12px" }}>리더보드</h1>
            {error ? ( // 에러 메시지 표시
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