import React, { useEffect, useState } from "react";
import { FilterTable } from "../../components/FilterTable/FilterTable";
import { Rank } from "./Rank";


export function Leaderboard()
{
    const [data, setData] = useState(lbData.result)
    const [filteredData, setFilteredData] = useState(lbData.result)

    useEffect(() => {
        const sortedData = lbData.result.sort((a, b) => b.totalScore - a.totalScore);
        setData(sortedData);
        setFilteredData(sortedData);
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

const lbData = {
    "status": 200,
    "message": "Leaderboard data retrieved successfully",
    "result": [
        {
            "rank": 1,
            "studentName": "홍채은",
            "studentId": "10987642",
            "studentGrade": 1,
            "studentMajor": "AI",
            "lqScore": 19.5,
            "rqScore": 25.5,
            "cqScore": 29.5,
            "totalScore": 74.5
        },
        {
            "rank": 2,
            "studentName": "박영희",
            "studentId": "23456789",
            "studentGrade": 1,
            "studentMajor": "GC",
            "lqScore": 27.0,
            "rqScore": 21.0,
            "cqScore": 24.0,
            "totalScore": 72.0
        },
        {
            "rank": 3,
            "studentName": "이유진",
            "studentId": "32198765",
            "studentGrade": 1,
            "studentMajor": "AI",
            "lqScore": 18.0,
            "rqScore": 25.0,
            "cqScore": 29.0,
            "totalScore": 72.0
        },
        {
            "rank": 4,
            "studentName": "홍서준",
            "studentId": "65432197",
            "studentGrade": 2,
            "studentMajor": "GC",
            "lqScore": 18.0,
            "rqScore": 25.0,
            "cqScore": 29.0,
            "totalScore": 72.0
        },
        {
            "rank": 5,
            "studentName": "박지수",
            "studentId": "43209876",
            "studentGrade": 2,
            "studentMajor": "AI",
            "lqScore": 16.5,
            "rqScore": 25.5,
            "cqScore": 29.5,
            "totalScore": 71.5
        },
        {
            "rank": 6,
            "studentName": "이채원",
            "studentId": "32109876",
            "studentGrade": 3,
            "studentMajor": "GC",
            "lqScore": 20.0,
            "rqScore": 23.0,
            "cqScore": 28.0,
            "totalScore": 71.0
        },
        {
            "rank": 7,
            "studentName": "김영희",
            "studentId": "67890123",
            "studentGrade": 2,
            "studentMajor": "AI",
            "lqScore": 15.5,
            "rqScore": 25.5,
            "cqScore": 29.5,
            "totalScore": 70.5
        },
        {
            "rank": 8,
            "studentName": "박민수",
            "studentId": "23450987",
            "studentGrade": 4,
            "studentMajor": "AI",
            "lqScore": 18.0,
            "rqScore": 23.0,
            "cqScore": 28.0,
            "totalScore": 69.0
        },
        {
            "rank": 9,
            "studentName": "김지혜",
            "studentId": "09876543",
            "studentGrade": 4,
            "studentMajor": "SW",
            "lqScore": 22.0,
            "rqScore": 21.0,
            "cqScore": 26.0,
            "totalScore": 69.0
        },
        {
            "rank": 10,
            "studentName": "최태민",
            "studentId": "21087654",
            "studentGrade": 2,
            "studentMajor": "SW",
            "lqScore": 16.5,
            "rqScore": 23.5,
            "cqScore": 28.5,
            "totalScore": 68.5
        },
        {
            "rank": 11,
            "studentName": "최지훈",
            "studentId": "45098765",
            "studentGrade": 2,
            "studentMajor": "GC",
            "lqScore": 20.5,
            "rqScore": 18.5,
            "cqScore": 27.5,
            "totalScore": 66.5
        },
        {
            "rank": 12,
            "studentName": "이승현",
            "studentId": "87654320",
            "studentGrade": 4,
            "studentMajor": "SW",
            "lqScore": 15.5,
            "rqScore": 23.5,
            "cqScore": 27.5,
            "totalScore": 66.5
        },
        {
            "rank": 13,
            "studentName": "최유진",
            "studentId": "21098765",
            "studentGrade": 4,
            "studentMajor": "AI",
            "lqScore": 14.0,
            "rqScore": 22.0,
            "cqScore": 30.0,
            "totalScore": 66.0
        },
        {
            "rank": 14,
            "studentName": "홍은지",
            "studentId": "10976543",
            "studentGrade": 3,
            "studentMajor": "GC",
            "lqScore": 15.0,
            "rqScore": 24.0,
            "cqScore": 27.0,
            "totalScore": 66.0
        },
        {
            "rank": 15,
            "studentName": "홍서준",
            "studentId": "65432109",
            "studentGrade": 4,
            "studentMajor": "GC",
            "lqScore": 19.0,
            "rqScore": 18.0,
            "cqScore": 29.0,
            "totalScore": 66.0
        },
        {
            "rank": 16,
            "studentName": "홍지훈",
            "studentId": "50987654",
            "studentGrade": 3,
            "studentMajor": "AI",
            "lqScore": 17.5,
            "rqScore": 24.5,
            "cqScore": 25.5,
            "totalScore": 67.5
        },
        {
            "rank": 17,
            "studentName": "박민호",
            "studentId": "98765421",
            "studentGrade": 3,
            "studentMajor": "AI",
            "lqScore": 17.0,
            "rqScore": 20.0,
            "cqScore": 28.0,
            "totalScore": 65.0
        },
        {
            "rank": 18,
            "studentName": "이도현",
            "studentId": "34509876",
            "studentGrade": 1,
            "studentMajor": "SW",
            "lqScore": 14.0,
            "rqScore": 22.0,
            "cqScore": 29.0,
            "totalScore": 65.0
        },
        {
            "rank": 19,
            "studentName": "김채원",
            "studentId": "09876542",
            "studentGrade": 2,
            "studentMajor": "GC",
            "lqScore": 21.0,
            "rqScore": 18.0,
            "cqScore": 26.0,
            "totalScore": 65.0
        },
        {
            "rank": 20,
            "studentName": "최준혁",
            "studentId": "21097654",
            "studentGrade": 4,
            "studentMajor": "GC",
            "lqScore": 10.0,
            "rqScore": 22.0,
            "cqScore": 28.0,
            "totalScore": 60.0
        },
        {
            "rank": 21,
            "studentName": "최철수",
            "studentId": "34567890",
            "studentGrade": 3,
            "studentMajor": "AI",
            "lqScore": 10.0,
            "rqScore": 20.0,
            "cqScore": 30.0,
            "totalScore": 60.0
        },
        {
            "rank": 22,
            "studentName": "박철수",
            "studentId": "78901234",
            "studentGrade": 3,
            "studentMajor": "SW",
            "lqScore": 18.5,
            "rqScore": 20.5,
            "cqScore": 21.5,
            "totalScore": 60.5
        },
        {
            "rank": 23,
            "studentName": "홍민수",
            "studentId": "01234567",
            "studentGrade": 2,
            "studentMajor": "SW",
            "lqScore": 20.0,
            "rqScore": 14.0,
            "cqScore": 26.0,
            "totalScore": 60.0
        },
        {
            "rank": 24,
            "studentName": "김정훈",
            "studentId": "12345098",
            "studentGrade": 3,
            "studentMajor": "GC",
            "lqScore": 19.0,
            "rqScore": 17.0,
            "cqScore": 24.0,
            "totalScore": 60.0
        },
        {
            "rank": 25,
            "studentName": "김태희",
            "studentId": "54321987",
            "studentGrade": 3,
            "studentMajor": "SW",
            "lqScore": 12.5,
            "rqScore": 19.5,
            "cqScore": 25.5,
            "totalScore": 57.5
        },
        {
            "rank": 26,
            "studentName": "최현우",
            "studentId": "76543219",
            "studentGrade": 1,
            "studentMajor": "GC",
            "lqScore": 11.5,
            "rqScore": 18.5,
            "cqScore": 26.5,
            "totalScore": 56.5
        },
        {
            "rank": 27,
            "studentName": "박서진",
            "studentId": "98765410",
            "studentGrade": 3,
            "studentMajor": "GC",
            "lqScore": 16.0,
            "rqScore": 19.0,
            "cqScore": 21.0,
            "totalScore": 56.0
        },
        {
            "rank": 28,
            "studentName": "이현서",
            "studentId": "87653210",
            "studentGrade": 2,
            "studentMajor": "GC",
            "lqScore": 19.0,
            "rqScore": 16.0,
            "cqScore": 21.0,
            "totalScore": 56.0
        },
        {
            "rank": 29,
            "studentName": "최하은",
            "studentId": "76543210",
            "studentGrade": 3,
            "studentMajor": "SW",
            "lqScore": 11.0,
            "rqScore": 20.0,
            "cqScore": 24.0,
            "totalScore": 55.0
        },
        {
            "rank": 30,
            "studentName": "박정우",
            "studentId": "98765432",
            "studentGrade": 1,
            "studentMajor": "GC",
            "lqScore": 16.0,
            "rqScore": 15.0,
            "cqScore": 23.0,
            "totalScore": 54.0
        },
        {
            "rank": 31,
            "studentName": "김도현",
            "studentId": "54321098",
            "studentGrade": 1,
            "studentMajor": "AI",
            "lqScore": 15.0,
            "rqScore": 17.0,
            "cqScore": 21.0,
            "totalScore": 53.0
        },
        {
            "rank": 32,
            "studentName": "홍하은",
            "studentId": "10987654",
            "studentGrade": 1,
            "studentMajor": "SW",
            "lqScore": 12.0,
            "rqScore": 16.0,
            "cqScore": 25.0,
            "totalScore": 53.0
        },
        {
            "rank": 33,
            "studentName": "홍길동",
            "studentId": "56789012",
            "studentGrade": 1,
            "studentMajor": "GC",
            "lqScore": 19.0,
            "rqScore": 12.0,
            "cqScore": 30.0,
            "totalScore": 61.0
        },
        {
            "rank": 34,
            "studentName": "이정훈",
            "studentId": "45678901",
            "studentGrade": 4,
            "studentMajor": "SW",
            "lqScore": 23.5,
            "rqScore": 17.5,
            "cqScore": 25.5,
            "totalScore": 66.5
        },
        {
            "rank": 35,
            "studentName": "이하은",
            "studentId": "87654329",
            "studentGrade": 4,
            "studentMajor": "AI",
            "lqScore": 12.0,
            "rqScore": 23.0,
            "cqScore": 28.0,
            "totalScore": 63.0
        },
        {
            "rank": 36,
            "studentName": "최우진",
            "studentId": "76542109",
            "studentGrade": 3,
            "studentMajor": "AI",
            "lqScore": 14.0,
            "rqScore": 24.0,
            "cqScore": 29.0,
            "totalScore": 67.0
        },
        {
            "rank": 37,
            "studentName": "최지훈",
            "studentId": "76543218",
            "studentGrade": 1,
            "studentMajor": "SW",
            "lqScore": 14.5,
            "rqScore": 22.5,
            "cqScore": 25.5,
            "totalScore": 62.5
        },
        {
            "rank": 38,
            "studentName": "박지훈",
            "studentId": "43210987",
            "studentGrade": 2,
            "studentMajor": "SW",
            "lqScore": 18.5,
            "rqScore": 20.5,
            "cqScore": 24.5,
            "totalScore": 63.5
        },
        {
            "rank": 39,
            "studentName": "김현서",
            "studentId": "09876541",
            "studentGrade": 2,
            "studentMajor": "SW",
            "lqScore": 17.0,
            "rqScore": 24.0,
            "cqScore": 26.0,
            "totalScore": 67.0
        },
        {
            "rank": 40,
            "studentName": "홍지원",
            "studentId": "65432198",
            "studentGrade": 2,
            "studentMajor": "AI",
            "lqScore": 13.0,
            "rqScore": 22.0,
            "cqScore": 24.0,
            "totalScore": 59.0
        },
        {
            "rank": 41,
            "studentName": "김유진",
            "studentId": "54320987",
            "studentGrade": 1,
            "studentMajor": "GC",
            "lqScore": 20.0,
            "rqScore": 19.0,
            "cqScore": 23.0,
            "totalScore": 62.0
        },
        {
            "rank": 42,
            "studentName": "박준영",
            "studentId": "43219876",
            "studentGrade": 4,
            "studentMajor": "GC",
            "lqScore": 10.0,
            "rqScore": 16.0,
            "cqScore": 21.0,
            "totalScore": 47.0
        },
        {
            "rank": 43,
            "studentName": "김재훈",
            "studentId": "09875432",
            "studentGrade": 4,
            "studentMajor": "AI",
            "lqScore": 17.0,
            "rqScore": 22.0,
            "cqScore": 24.0,
            "totalScore": 63.0
        },
        {
            "rank": 44,
            "studentName": "박수민",
            "studentId": "98764321",
            "studentGrade": 1,
            "studentMajor": "SW",
            "lqScore": 13.5,
            "rqScore": 20.5,
            "cqScore": 26.5,
            "totalScore": 60.5
        },
        {
            "rank": 45,
            "studentName": "최지혜",
            "studentId": "90123456",
            "studentGrade": 1,
            "studentMajor": "AI",
            "lqScore": 11.0,
            "rqScore": 16.0,
            "cqScore": 22.0,
            "totalScore": 49.0
        },
        {
            "rank": 46,
            "studentName": "홍정현",
            "studentId": "65431098",
            "studentGrade": 4,
            "studentMajor": "SW",
            "lqScore": 11.0,
            "rqScore": 18.0,
            "cqScore": 20.0,
            "totalScore": 49.0
        }
    ]
};
