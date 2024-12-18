import React, { useState, useRef } from 'react';
import './AccordionItem.css'

export function CQInfo({ studentCQData, onCQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onCQDataChange(name, value);
    };

    const handleSeminarChange = (index, event) => {
        const newSeminars = [...studentCQData.seminar];
        newSeminars[index] = event.target.value;
        onCQDataChange("seminar", newSeminars);
    };

    const handleAddSeminar = () => {
        const newSeminars = [...studentCQData.seminar, ""];
        onCQDataChange("seminar", newSeminars);
    };

    const handleRemoveSeminar = (index) => {
        const newSeminars = studentCQData.seminar.filter((_, i) => i !== index);
        onCQDataChange("seminar", newSeminars);
    };

    const handleStudioContributionChange = (index, event) => {
        const newContributions = [...studentCQData.studioContribution];
        newContributions[index] = event.target.value;
        onCQDataChange("studioContribution", newContributions);
    };

    const handleAddStudioContribution = () => {
        const newContributions = [...studentCQData.studioContribution, ""];
        onCQDataChange("studioContribution", newContributions);
    };

    const handleRemoveStudioContribution = (index) => {
        const newContributions = studentCQData.studioContribution.filter((_, i) => i !== index);
        onCQDataChange("studioContribution", newContributions);
    };

    const handleStudyGroupChange = (event) => {
        const { value } = event.target;
        const newStudyGroup = {
            studyGroup_leader: value === "studyGroup_leader" ? 1 : 0,
            studyGroup_vice_leader: value === "studyGroup_vice_leader" ? 1 : 0,
            studyGroup_participate: value === "studyGroup_participate" ? 1 : 0,
        };
        onCQDataChange("studyGroup_leader", newStudyGroup.studyGroup_leader);
        onCQDataChange("studyGroup_vice_leader", newStudyGroup.studyGroup_vice_leader);
        onCQDataChange("studyGroup_participate", newStudyGroup.studyGroup_participate);
    };

    const getDefaultStudyGroupValue = () => {
        if (studentCQData.studyGroup_leader === 1) return "studyGroup_leader";
        if (studentCQData.studyGroup_vice_leader === 1) return "studyGroup_vice_leader";
        if (studentCQData.studyGroup_participate === 1) return "studyGroup_participate";
        return "";
    };

    return (
        <div className='form-container' style={{ whiteSpace: "nowrap" }}>
            <div className='form-group form-group-row'>
                <label style={{ marginRight: '24px' }}>산학프로젝트</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="coop"
                    value={studentCQData.coop || ''} 
                    placeholder='기업명과 본인의 역할 및 수행 내용을 작성해 주세요.' 
                    style={{ ...inputStyle, width: "80%" }} 
                    onChange={handleInputChange} 
                    disabled={!editable}
                />
            </div>
            {/* <FileUpload 
                label="인턴십" 
                fileName={studentCQData.internship} 
                editable={editable} 
                onCQDataChange={onCQDataChange} 
                fieldName="internship" 
                inputStyle={inputStyle}
            />
            <FileUpload 
                label="창업" 
                fileName={studentCQData.startup} 
                editable={editable} 
                onCQDataChange={onCQDataChange} 
                fieldName="startup" 
                inputStyle={inputStyle}
            /> */}
            <div className='form-group form-group-row'>
                <label style={{ marginRight: '24px', whiteSpace: "nowrap"}}>인턴십</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="internship"
                    value={studentCQData.internship || ''} 
                    placeholder='인턴십 기업명과 역할을 작성해 주세요.' 
                    style={{ ...inputStyle, width: "80%" }} 
                    onChange={handleInputChange} 
                    disabled={!editable}
                />
            </div>
            <div className='form-group form-group-row'>
                <label style={{ marginRight: '24px', whiteSpace: "nowrap"}}>창업</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="startup"
                    value={studentCQData.startup || ''} 
                    placeholder='기업명과 역할을 작성해 주세요.' 
                    style={{ ...inputStyle, width: "80%" }} 
                    onChange={handleInputChange} 
                    disabled={!editable}
                />
            </div>
            <div className='form-group form-group-row'>
                <label style={{ marginRight: '24px', whiteSpace: "nowrap"}}>해외 봉사 활동</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name="overseaVolunteer"
                    value={studentCQData.overseaVolunteer || ''} 
                    placeholder='해외 봉사 활동 내용을 작성해 주세요.' 
                    style={{ ...inputStyle, width: "80%" }} 
                    onChange={handleInputChange} 
                    disabled={!editable}
                />
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>화상강연 / 세미나 참여</label>
                    <button className='add-item' onClick={handleAddSeminar} disabled={!editable}>
                        항목 추가
                    </button>
                </div>
                {studentCQData.seminar.map((seminar, index) => (
                    <div key={index} className='form-group form-group-row' style={{ width: "90%" }}>
                        <textarea
                            className='form-control'
                            rows="1"
                            name={`seminar_${index}`}
                            value={seminar}
                            placeholder="참여한 강연 및 세미나 이름을 입력해 주세요."
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            onChange={(e) => handleSeminarChange(index, e)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveSeminar(index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>스튜디오 기여</label>
                    <span className='sub-label'>ARS Electronica 작품 제공 학생</span>
                    <button className='add-item' onClick={handleAddStudioContribution} disabled={!editable}>
                        항목 추가
                    </button>
                </div>
                {studentCQData.studioContribution.map((contribution, index) => (
                    <div key={index} className='form-group form-group-row' style={{ width: "90%" }}>
                        <textarea
                            className='form-control'
                            rows="1"
                            name={`studioContribution_${index}`}
                            value={contribution}
                            placeholder='작품명 및 설명을 작성해 주세요.'
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            onChange={(e) => handleStudioContributionChange(index, e)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveStudioContribution(index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>스터디 그룹</label>
                    <span className='sub-label'>SCG MAV 스꾸딩 스꾸디 S-CAR HIT GDSC SST NPC 소속 학생</span>
                    <select 
                        className='form-control' 
                        name="studyGroup" 
                        value={getDefaultStudyGroupValue()} 
                        onChange={handleStudyGroupChange} 
                        style={inputStyle}
                        disabled={!editable}
                    >
                        <option value="">직급 선택</option>
                        <option value="studyGroup_leader">회장</option>
                        <option value="studyGroup_vice_leader">부회장</option>
                        <option value="studyGroup_participate">참여</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

// 파일 업로드 컴포넌트
const FileUpload = ({ label, fileName, editable, onCQDataChange, fieldName, inputStyle }) => {
    const [selectedFile, setSelectedFile] = useState(fileName || ""); // Keep the initial file name if provided
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file.name); // Set the selected file name but don't update the text input
            onCQDataChange(`${fieldName}FileName`, file.name); // Store file name separately
        } else {
            alert('PDF 파일만 업로드할 수 있습니다.');
            setSelectedFile(""); // Clear selected file if not a valid PDF
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleTextChange = (event) => {
        const { value } = event.target;
        onCQDataChange(fieldName, value); // Update the text input value in the parent component's state
    };

    return (
        <div className='form-group form-group-row'>
            <label style={{ marginRight: '24px' }}>{label}</label>
            <input 
                type='text' 
                className='form-control' 
                value={fileName || ''}  // Keep the original text input value separate
                placeholder='기업명과 본인의 역할 및 수행 내용을 작성해 주세요.' 
                style={{ ...inputStyle, width: "80%" }} 
                onChange={handleTextChange}  // Allow editing the input field
                disabled={!editable}  // Disable input when not in edit mode
            />
            <div className='file-upload-row'>
                {selectedFile && (
                    <span className='file-name'>{selectedFile}</span>
                )}
                <button className='upload-button' onClick={handleFileUpload} disabled={!editable}>파일 업로드</button>
                <input
                    type='file'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept='application/pdf'
                />
            </div>
        </div>
    );
};