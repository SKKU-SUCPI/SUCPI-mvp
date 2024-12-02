import React, { useEffect, useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { PersonalInfo } from "./PersonalInfo";
import { LQInfo } from "./LQInfo";
import { RQInfo } from "./RQInfo";
import { CQInfo } from "./CQInfo";
import { fetchStudentData, saveStudentData } from "../../api"; // 리팩토링된 API 함수 가져오기
import './Profile.css';
import menuImage from '../../assets/menu.png';

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
        const loadStudentData = async () => {
            try {
                const data = await fetchStudentData("2022530259"); // TODO - Login 후 변경
                setStudentInfoData(data.studentInfo);
                setStudentLQData(data.lqInfo);
                setStudentRQData(data.rqInfo);
                setStudentCQData(data.cqInfo);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        loadStudentData();
    }, []);

    const handleEditClick = () => setEditable(true);

    const handleSaveClick = async () => {
        setEditable(false);

        const updatedData = {
            studentInfo: studentInfoData,
            lqInfo: studentLQData,
            rqInfo: studentRQData,
            cqInfo: studentCQData,
        };

        try {
            await saveStudentData(updatedData);
            alert("저장이 완료되었습니다.");
        } catch (error) {
            alert("저장에 실패하였습니다.");
            console.error('Error:', error);
        }
    };

    const handleInfoChange = (name, value) => {
        setStudentInfoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLQDataChange = (name, value) => {
        setStudentLQData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRQDataChange = (name, value) => {
        setStudentRQData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCQDataChange = (name, value) => {
        setStudentCQData((prevData) => ({
            ...prevData,
            [name]: value,
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
                <AccordionItem title="연구활동">
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