import React, { useEffect, useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";


export function Leaderboard()
{
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // API 요청
        fetch("http://localhost:8080/api/admin/leaderboard")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.result); // API에서 받은 데이터를 상태에 저장
                setFilteredData(data.result); // 초기 필터된 데이터로 설정
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }, []);

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>리더보드</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            <FilterTable data={data} setFilteredData={setFilteredData} />
            <h3 style={{padding:"48px 36px 12px"}}>순위</h3>
            <Rank data={filteredData} />
        </div>
    );
}