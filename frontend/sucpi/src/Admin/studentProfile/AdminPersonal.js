import React, { useEffect } from 'react';
import '../../Student/profile/Profile.css'

export function AdminPersonal({ studentInfo }) {

    // useEffect(() => {
    //     console.log("Student Info:", studentInfo);
    // }, [studentInfo]);

    const majorMapping = {
        "SW": "소프트웨어학과",
        "GC": "글로벌융합학부",
        "AI": "지능형 소프트웨어학과"
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>이름</label>
                <label>{studentInfo.studentName}</label>
            </div>
            <div className='form-group form-group-row'>
                <label>학번</label>
                <label>{studentInfo.studentId}</label>
            </div>
            <div className='form-group form-group-row'>
                <label>소속 학과</label>
                <label style={{ whiteSpace: "nowrap" }}>{majorMapping[studentInfo.studentMajor]}</label>
            </div>
            <div className='form-group form-group-row'>
                <label style={{ whiteSpace: "nowrap" }}>연락처</label>
                <label style={{ whiteSpace: "nowrap" }}>
                    {studentInfo.studentPhoneNum.split('-')[0]} - {studentInfo.studentPhoneNum.split('-')[1]} - {studentInfo.studentPhoneNum.split('-')[2]}
                </label>
            </div>
        </div>
    );
}