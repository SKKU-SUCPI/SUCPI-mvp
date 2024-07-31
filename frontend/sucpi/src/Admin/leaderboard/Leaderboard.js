import React, { useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";


export function Leaderboard()
{
    const [data, setData] = useState(lbData)
    const [filteredData, setFilteredData] = useState(lbData)

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>리더보드</h1>
            <h3 style={{padding:"32px 36px 12px"}}>필터</h3>
            <FilterTable />
            <h3 style={{padding:"48px 36px 12px"}}>순위</h3>
            <Rank data={filteredData} />
        </div>
    );
}

const lbData = [
    // 샘플 데이터
    { rank: 1, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 2, name: '2홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 3, name: '3홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 4, name: '4홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 5, name: '5홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 6, name: '6', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 7, name: '7', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 8, name: '8', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 9, name: '9', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 10, name: '10', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 11, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 4, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 5, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 6, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 7, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 8, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 9, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 },
    { rank: 10, name: '홍길동', id: '2020311234', grade: 2, department: '소프트웨어학과', sucpi: 75, lq: 30, cq: 20, rq: 25 }
];
