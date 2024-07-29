import React from 'react';
import './AccordionItem.css';

export function PersonalInfo({ studentInfo, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};
    
    // 매핑 테이블을 생성하여 studentMajor 값을 소속 학과 이름으로 변환
    const majorMapping = {
        "SW": "소프트웨어학과",
        "GC": "글로벌융합학부",
        "AI": "지능형 소프트웨어학과"
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>이름</label>
                <input 
                    type='text' 
                    className='form-control' 
                    defaultValue={studentInfo.studentName} 
                    disabled={true} 
                />
            </div>
            <div className='form-group form-group-row'>
                <label>학번</label>
                <input 
                    type='text' 
                    className='form-control' 
                    defaultValue={studentInfo.studentId} 
                    disabled={true} 
                />
            </div>
            <div className='form-group form-group-row'>
                <label>소속 학과</label>
                <input 
                    type='text' 
                    className='form-control' 
                    defaultValue={majorMapping[studentInfo.studentMajor] || "학과를 선택해 주세요"} 
                    disabled={true} 
                />
            </div>
            <div className='form-group form-group-row'>
                <label style={{ whiteSpace: "nowrap" }}>연락처</label>
                <input 
                    type='text' 
                    className='form-control-contact' 
                    defaultValue={studentInfo.studentPhoneNum.split('-')[0]} 
                    disabled={!editable} 
                    style={inputStyle} 
                /> - 
                <input 
                    type='text' 
                    className='form-control' 
                    defaultValue={studentInfo.studentPhoneNum.split('-')[1]} 
                    disabled={!editable} 
                    style={inputStyle} 
                /> - 
                <input 
                    type='text' 
                    className='form-control' 
                    defaultValue={studentInfo.studentPhoneNum.split('-')[2]} 
                    disabled={!editable} 
                    style={inputStyle} 
                />
            </div>
        </div>
    );
}
