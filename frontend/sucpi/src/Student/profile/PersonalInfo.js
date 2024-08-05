import React from 'react';
import './AccordionItem.css';

export function PersonalInfo({ studentInfo, onInfoChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};
    
    const majorMapping = {
        "SW": "소프트웨어학과",
        "GC": "글로벌융합학부",
        "AI": "지능형 소프트웨어학과"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        onInfoChange(name, value);
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>이름</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="studentName"
                    value={studentInfo.name} 
                    onChange={handleChange}
                    disabled={true} 
                />
            </div>
            <div className='form-group form-group-row'>
                <label>학번</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="studentId"
                    value={studentInfo.Id} 
                    onChange={handleChange}
                    disabled={true}
                />
            </div>
            <div className='form-group form-group-row'>
                <label>소속 학과</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="studentMajor"
                    value={majorMapping[studentInfo.major] || "학과를 선택해 주세요"} 
                    onChange={handleChange}
                    disabled={true}
                />
            </div>
            <div className='form-group form-group-row'>
                <label style={{ whiteSpace: "nowrap" }}>연락처</label>
                <input 
                    type='text' 
                    className='form-control-contact' 
                    name="studentPhoneNum1"
                    value={studentInfo.phone.split('-')[0]} 
                    onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value + '-' + studentInfo.phone.split('-')[1] + '-' + studentInfo.phone.split('-')[2] } })}
                    disabled={!editable} 
                    style={inputStyle} 
                /> - 
                <input 
                    type='text' 
                    className='form-control' 
                    name="studentPhoneNum2"
                    value={studentInfo.phone.split('-')[1]} 
                    onChange={(e) => handleChange({ target: { name: 'phone', value: studentInfo.phone.split('-')[0] + '-' + e.target.value + '-' + studentInfo.phone.split('-')[2] } })}
                    disabled={!editable} 
                    style={inputStyle} 
                /> - 
                <input 
                    type='text' 
                    className='form-control' 
                    name="studentPhoneNum3"
                    value={studentInfo.phone.split('-')[2]} 
                    onChange={(e) => handleChange({ target: { name: 'phone', value: studentInfo.phone.split('-')[0] + '-' + studentInfo.phone.split('-')[1] + '-' + e.target.value } })}
                    disabled={!editable} 
                    style={inputStyle} 
                />
            </div>
        </div>
    );
}