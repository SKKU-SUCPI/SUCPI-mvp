import React, { useState } from 'react';
import './AccordionItem';

export function RQInfo()
{
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedConference, setSelectedConference] = useState('');
    const [selectedCompetition, setSelectedCompetition] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleConferenceChange = (event) => {
        setSelectedConference(event.target.value);
    };

    const handleCompetitionChange = (event) => {
        setSelectedCompetition(event.target.value);
    };


    const humanitiesOptions = [
        { value: 'sci_ssci', label: 'SCI, SSCI, A&HCI 급 학술지' },
        { value: 'kci_excellent', label: 'KCI 우수등재 학술지' },
        { value: 'kci', label: 'KCI 등재' },
        { value: 'kci_candidate', label: 'KCI 후보, 기타국제' },
    ];

    const scienceOptions = [
        { value: 'jcr_top_5', label: 'JCR 상위 5% 이내 학술지(주저)' },
        { value: 'jcr_top_5_sub', label: 'JCR 상위 5% 이내 학술지(공저)' },
        { value: 'jcr_top_10', label: 'JCR 상위 10% 이내 학술지(주저)' },
        { value: 'jcr_top_10_sub', label: 'JCR 상위 10% 이내 학술지(공저)' },
        { value: 'jcr_top_20', label: 'JCR 상위 20% 이내 학술지(주저)' },
        { value: 'jcr_top_20_sub', label: 'JCR 상위 20% 이내 학술지(공저)' },
    ];

    const conferenceOptions = [
        { value: 'major_international', label: '저명 국제학술대회 발표 (BK기준)' },
        { value: 'general_international', label: '일반 국제학술대회 발표' },
        { value: 'domestic', label: '국내학술대회 발표' },
    ];

    const gradeOptions = {
        major_international: [
            { value: 'speech', label: '구두발표' },
            { value: 'poster', label: '포스터발표' },
        ],
        general_international: [
            { value: 'speech', label: '구두발표' },
            { value: 'poster', label: '포스터발표' },
        ],
        domestic: [
            { value: 'speech', label: '구두발표' },
            { value: 'poster', label: '포스터발표' },
        ],
    };

    const competitionOptions = [
        { value: 'international', label: '국제/대규모 공모전(ICPC, 공개SW개발자대회)' },
        { value: 'domestic', label: '교내/지역 공모전' },
    ];

    const competitionGrades = {
        international: [
            { value: 'grand', label: '대상' },
            { value: 'award', label: '입상' },
            { value: 'participation', label: '참여' },
        ],
        domestic: [
            { value: 'grand', label: '대상' },
            { value: 'award', label: '입상' },
            { value: 'participation', label: '참여' },
        ],
    };

    const renderOptions = (options) => {
        return options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ));
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>학술지 논문 게재</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <div className='form-group form-group-row' >
                    <select className='form-control' onChange={handleCategoryChange} style={{width: "120px"}}>
                        <option value="">계열 선택</option>
                        <option value="humanities">인문사회계열</option>
                        <option value="science">과학기술계열</option>
                    </select>
                    <select className='form-control fixed-width'>
                        <option value="">논문 등급</option>
                        {selectedCategory === 'humanities' && renderOptions(humanitiesOptions)}
                        {selectedCategory === 'science' && renderOptions(scienceOptions)}
                    </select>
                    <textarea className='form-control' rows="1" placeholder="논문 제목을 입력해 주세요" style={{resize: "none", overflow: "hidden", width: "420px"}}></textarea>
                </div>
            </div>
            <hr className="divider" />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>학술 대회 발표</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <div className='form-group form-group-row' style={{ width: "90%" }}>
                    <select className='form-control fixed-width' onChange={handleConferenceChange}>
                        <option value="">계열 선택</option>
                        {renderOptions(conferenceOptions)}
                    </select>
                    <select className='form-control fixed-width' style={{width: "120px"}}>
                        <option value="">발표 등급</option>
                        {selectedConference && renderOptions(gradeOptions[selectedConference])}
                    </select>
                    <textarea className='form-control' rows="1" placeholder="학술 대회명을 입력해 주세요" style={{resize: "none", overflow: "hidden", width: "420px"}}></textarea>
                </div>
            </div>
            <hr className="divider" />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>공모전/ICPC</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <div className='form-group form-group-row' style={{ width: "90%" }}>
                    <select className='form-control fixed-width' onChange={handleCompetitionChange}>
                        <option value="">계열 선택</option>
                        {renderOptions(competitionOptions)}
                    </select>
                    <select className='form-control fixed-width' style={{width: "120px"}}>
                        <option value="">공모전 등급</option>
                        {selectedCompetition && renderOptions(competitionGrades[selectedCompetition])}
                    </select>
                    <textarea className='form-control' rows="1" placeholder="공모전 이름을 입력해 주세요" style={{resize: "none", overflow: "hidden", width: "420px"}}></textarea>
                </div>
            </div>
        </div>
    );
}