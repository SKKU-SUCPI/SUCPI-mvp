import React, { useState, useRef, useEffect } from 'react';
import './AccordionItem'

export function CQInfo({ studentCQData, onCQDataChange, editable })
{
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    

    return (
        <div className='form-container' style={{ whiteSpace: "nowrap" }}>
            <div className='form-group form-group-row' >
                <label style={{ marginRight: '24px' }}>산학프로젝트</label>
                <input type='text' className='form-control' placeholder='기업명과 본인의 역할 및 수행 내용을 작성해 주세요.' style={{width: "80%", paddingLeft: "24px"}}/>
            </div>
            <FileUpload label="인턴십" />
            <FileUpload label="창업" />
            <div className='form-group form-group-row' >
                <label style={{ marginRight: '24px', whiteSpace: "nowrap"}}>해외 봉사 활동</label>
                <input type='text' className='form-control' placeholder='기업명과 본인의 역할 및 수행 내용을 작성해 주세요.' style={{width: "80%", paddingLeft: "24px"}}/>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>화상강연 / 세미나 참여</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <div className='form-group form-group-row' style={{ width: "90%" }}>
                    <textarea className='form-control' rows="1" placeholder="참여한 강연 및 세미나 이름을 입력해 주세요." style={{resize: "none", overflow: "hidden", width: "100%"}}></textarea>
                </div>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-row' style={{whiteSpace: "nowrap", gap: "30%", marginBottom: "24px"}}>
                <label>알리미</label>
                <select className='form-control'>
                <option style={{fontSize: "14px"}}>직급 선택</option>
                    <option value="president">회장</option>
                    <option value="vise-president">부회장</option>
                    <option value="executive">임원진</option>
                    <option value="participant">참여</option>
                </select>
            </div>
            <div className='form-group form-group-row' style={{whiteSpace: "nowrap", gap: "30%", marginBottom: "24px"}}>
                <label>학생회</label>
                <select className='form-control'>
                    <option style={{fontSize: "14px"}}>직급 선택</option>
                    <option value="president">회장</option>
                    <option value="vise-president">부회장</option>
                    <option value="executive">임원진</option>
                    <option value="participant">참여</option>
                </select>
            </div>
            <div className='form-group form-group-row' style={{whiteSpace: "nowrap", gap: "30%", marginBottom: "24px"}}>
                <label>기자단</label>
                <select className='form-control'>
                <option style={{fontSize: "14px"}}>직급 선택</option>
                    <option value="president">회장</option>
                    <option value="vise-president">부회장</option>
                    <option value="participant">참여</option>
                </select>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label style={{width: "0px"}}>스튜디오 기여</label>
                    <span className='sub-label'>ARS Electronica 작품 제공 학생</span>
                    <button className='add-item'>항목 추가</button>
                </div>
                <div className='form-group form-group-row' style={{ width: "90%" }}>
                    <input type='text' className='form-control' placeholder='작품명 및 설명을 작성해 주세요.' style={{width: "80%"}}/>
                </div>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label style={{width: "0px"}}>스튜디오 기여</label>
                    <span className='sub-label'>SCG MAV 스꾸딩 스꾸디 S-CAR  HIT GDSC SST NPC 소속 학생</span>
                    <select className='form-control'>
                        <option style={{fontSize: "14px"}}>직급 선택</option>
                        <option value="president">회장</option>
                        <option value="vise-president">부회장</option>
                        <option value="participant">참여</option>
                    </select>
                </div>
            </div>     
        </div>
    );
}




// 파일 업로드
const FileUpload = ({ label }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('PDF 파일만 업로드할 수 있습니다.');
            setSelectedFile(null);
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='form-group form-group-row'>
            <label style={{ marginRight: '24px' }}>{label}</label>
            <input type='text' className='form-control' placeholder='기업명과 본인의 역할 및 수행 내용을 작성해 주세요.' style={{ width: "80%" }} />
            <div className='file-upload-row'>
                {selectedFile && (
                    <span className='file-name'>{selectedFile.name}</span>
                )}
                <button className='upload-button' onClick={handleFileUpload}>파일 업로드</button>
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
