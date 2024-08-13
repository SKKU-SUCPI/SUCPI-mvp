import React, { useEffect, useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { PersonalInfo } from "./PersonalInfo";
import { LQInfo } from "./LQInfo";
import { RQInfo } from "./RQInfo";
import { CQInfo } from "./CQInfo";
import './Profile.css'
import menuImage from '../../assets/menu.png'


export function RightMenu({ editable, onSaveClick, onEditClick }) {
    return (
        <div className="right-menu">
            <div className="right-menu-header">
                <img src={menuImage} alt="SUCPI Logo" className="circle-logo-image" />
            </div>
            <div className="right-menu-body">
                <button className="right-menu-button add-button" onClick={onSaveClick}>저장하기</button>
                <button className="right-menu-button edit-button" onClick={onEditClick}>수정하기</button>
            </div>
        </div>
    );
}

export function Profile() {
    const [editable, setEditable] = useState(false);
    const [studentInfoData, setStudentInfoData] = useState(null);
    const [studentLQData, setStudentLQData] = useState(null);
    const [studentRQData, setStudentRQData] = useState(null);
    const [studentCQData, setStudentCQData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 변경필요
        fetch('http://localhost:8080/api/students/2019374894')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStudentInfoData(data.result.studentInfo);
                setStudentLQData(data.result.lqInfo);
                setStudentRQData(data.result.rqInfo);
                setStudentCQData(data.result.cqInfo);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleEditClick = () => setEditable(true);
    const handleSaveClick = () => {
        setEditable(false);
        alert("저장이 완료되었습니다.");
        // Here you can add the logic to save the data to the server
    };

    const handleInfoChange = (name, value) => {
        setStudentInfoData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLQDataChange = (name, value) => {
        setStudentLQData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRQDataChange = (name, value) => {
        setStudentRQData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCQDataChange = (name, value) => {
        setStudentCQData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile" style={{ backgroundColor: '#F0F0F0', marginRight: '30%' }}>
                <h1>내 정보</h1>
                <AccordionItem title="개인정보">
                    <PersonalInfo studentInfo={studentInfoData} onInfoChange={handleInfoChange} editable={editable} />
                </AccordionItem>
                <AccordionItem title="교과활동">
                    <LQInfo studentLQData={studentLQData} onLQDataChange={handleLQDataChange} editable={editable} />
                </AccordionItem>
                <AccordionItem title="연구활동(추후변경하기)">
                    <RQInfo studentRQData={studentRQData} onRQDataChange={handleRQDataChange} editable={editable} />
                </AccordionItem>
                <AccordionItem title="비교과활동">
                    <CQInfo studentCQData={studentCQData} onCQDataChange={handleCQDataChange} editable={editable} />
                </AccordionItem>
            </div>
            <RightMenu onSaveClick={handleSaveClick} onEditClick={handleEditClick} editable={editable} />
        </div>
    );
}


// 더미 데이터
const data = {
    "status": 200,
    "message": "Student details retrieved successfully",
    "result": {
        "cqInfo": {
            "coop": "2022년 웅진 씽크빅에서 게임봇 및 챗봇을 개발하였습니다.",
            "internship": "",
            "startup": "",
            "overseaVolunteer": "2024 하계 ICT 해외봉사를 다녀왔습니다.",
            "seminar": ["AWS Korea의 강연을 들었습니다.", "Meta의 강연을 들었습니다."],
            "alimi_leader": 0,
            "alimi_vise_leader": 0,
            "alimi_participate": 0,
            "council_leader": 1,
            "council_vise_leader": 0,
            "council_particiapte": 0,
            "reporter_leader": 1,
            "reporter_vise_leader": 0,
            "reporter_participate": 0,
            "studioContribution": ["ARS Electronica 작품을 제작하였습니다."],
            "studyGroup_leader": 0,
            "studyGroup_vise_leader": 1,
            "studyGroup_participate": 0
        },
        "studentInfo": {
            "Id": "2020123123",
            "major": "SW",
            "name": "홍길동",
            "phone": "010-1234-5678"
        },
        "RQInfo": {
            "RQYulNationalPoster": 0,
            "RQYulPlaySchoolCompetition": 0,
            "RQYulWinBigCompetition": 0,
            "RQYulJcr10Main": 0,
            "RQMyeongNationalSpeech": 0,
            "RQMyeongBigCompetition": 0,
            "RQYulJcr5Main": 0,
            "RQYulKnownSpeech": 0,
            "RQYulPlayBigCompetition": 0,
            "RQYulNormalSpeech": 0,
            "RQYulJcr5Part": 0,
            "RQMyeongNormalSpeech": 0,
            "RQYulJcr20Part": 0,
            "RQMyeongOverKci": 0,
            "RQYulNationalSpeech": 0,
            "RQYulJcr20Main": 0,
            "RQMyeongKnownSpeech": 0,
            "RQYulKnownPoster": 0,
            "RQYulNormalPoster": 0,
            "RQMyeongKciExcellent": 0,
            "RQMyeongSchoolCompetition": 0,
            "RQYulJcr10Part": 0,
            "RQYulWinSchoolCompetition": 0,
            "RQMyeongKci": 0,
            "RQMyeongKciCandidate": 0
        },
        "lqInfo": {
            "studentId": "2023533384",
            "activityEdu": [],
            "activityTA": [],
            "grade40TO45": 0,
            "grade35TO40": 1,
            "grade30TO35": 0,
            "grade00TO30": 0,
            "openSourceActivityStar0": 0,
            "openSourceActivityStar3": 0,
            "openSourceActivityStar4": 1,
            "openSourceActivityStar5": 0,
            "committerStar0": 0,
            "committerStar3": 0,
            "committerStar4": 1,
            "committerStar5": 0
        },
    }
};