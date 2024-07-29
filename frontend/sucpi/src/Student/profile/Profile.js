import React, { useState } from "react";
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
    const [studentInfoData, setStudentInfoData] = useState(data.result.studentInfo);
    const [studentLQData, setStudentLQData] = useState(data.result.LQInfo);

    const handleEditClick = () => setEditable(true);
    const handleSaveClick = () => {
        setEditable(false);
        alert("저장이 완료되었습니다.");
        // 여기서 데이터를 서버에 저장하는 로직을 추가할 수 있습니다.
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
                    <RQInfo />
                </AccordionItem>
                <AccordionItem title="비교과활동">
                    <CQInfo />
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
        "CQInfo": {
            "CQCoop": 0,
            "CQInternship": 0,
            "CQStartup": 0,
            "CQStudentCouncil": 0,
            "CQLectureSeminar": 0,
            "CQOverseaVolunteer": 0,
            "CQMediaPromotion": 0,
            "CQStudyGroup": 0,
            "CQStudioContribution": 0,
            "CQAlimi": 0
        },
        "studentInfo": {
            "studentId": "2020123123",
            "studentMajor": "SW",
            "studentName": "홍길동",
            "studentPhoneNum": "010-1234-5678"
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
        "LQInfo": {
            "LQGrade35TO40": 0,
            "LQOpenSourceActivity1Star4": 0,
            "LQOpenSourceActivity2Star2": 0,
            "LQGrade30TO35": 0,
            "LQOpenSourceActivity1Star5": 0,
            "LQOpenSourceActivity2Star1": 0,
            "LQOpenSourceActivity1Star2": 0,
            "LQOpenSourceActivity1Star3": 0,
            "LQEduActivity1": 5,
            "LQOpenSourceActivity1Star1": 0,
            "LQOpenSourceActivity2Star5": 0,
            "LQOpenSourceActivity2Star4": 0,
            "LQEduActivity2": 0,
            "LQOpenSourceActivity2Star3": 0,
            "LQGrade40TO45": 0
        }
    }
};