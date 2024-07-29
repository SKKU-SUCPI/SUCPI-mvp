import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import './DetailSetting.css';

// 데이터 추후 변경 필요
const data = {
    LQ: [
        { category: '학점', criteria: '4.0이상 4.5이하', score: '3점', edit: '점' },
        { category: '학점', criteria: '3.5이상 3.99이하', score: '2점', edit: '점' },
        { category: '학점', criteria: '3.0이상 3.49이하', score: '1점', edit: '점' },
        { category: '학점', criteria: '2.99이하', score: '0점', edit: '점' },
        { category: '교육활동', criteria: '교내외의 교육 활동', score: '0.2점/건', edit: '점/건' },
        { category: '교육활동', criteria: '교육조교 활동(학부생 TA)', score: '0.5점/학기', edit: '점/학기' },
        { category: '오픈소스 SW활동', criteria: 'OS커뮤니티 생성 및 활성도', score: '3점', edit: '점' },
        { category: '오픈소스 SW활동', criteria: '커미터로서의 활동', score: '3점', edit: '점' },
    ],
    RQ: [
        { category: '학술지 논문 게재', criteria: 'SCI, SSCI, A&HCI 급 학술지', score: '5점', edit: '점' },
        { category: '학술지 논문 게재', criteria: 'KCI 우수등재 학술지', score: '4점', edit: '점' },
        { category: '학술지 논문 게재', criteria: 'KCI 등재', score: '3점', edit: '점' },
        { category: '학술지 논문 게재', criteria: 'KCI 후보, 기타국제', score: '2점', edit: '점' },
        { category: '학술 대회 발표', criteria: '저명 국제학술대회 발표 (BK기준)', score: '4점', edit: '점' },
        { category: '학술 대회 발표', criteria: '일반 국제학술대회 발표', score: '3점', edit: '점' },
        { category: '학술 대회 발표', criteria: '국내학술대회 발표', score: '2점', edit: '점' },
        { category: '공모전/ICPC', criteria: '국제/대규모 공모전', score: '3점', edit: '점' },
        { category: '공모전/ICPC', criteria: '교내/지역 공모전', score: '2점', edit: '점' },
    ],
    CQ: [
        { category: '산학프로젝트', criteria: '수행여부', score: '10점', edit: '점' },
        { category: '인턴십', criteria: '수행여부', score: '10점', edit: '점' },
        { category: '창업', criteria: '수행여부', score: '30점', edit: '점' },
        { category: '해외 봉사', criteria: '수행여부', score: '10점', edit: '점' },
        { category: '화상강연 / 세미나 참여', criteria: '수행여부', score: '1점', edit: '점' },
        { category: '알리미', criteria: '직급 선택 - 회장', score: '5점', edit: '점' },
        { category: '알리미', criteria: '직급 선택 - 부회장', score: '3점', edit: '점' },
        { category: '알리미', criteria: '직급 선택 - 참여', score: '2점', edit: '점' },
        { category: '학생회', criteria: '직급 선택 - 회장', score: '5점', edit: '점' },
        { category: '학생회', criteria: '직급 선택 - 부회장', score: '3점', edit: '점' },
        { category: '학생회', criteria: '직급 선택 - 참여', score: '2점', edit: '점' },
        { category: '기자단', criteria: '직급 선택 - 회장', score: '5점', edit: '점' },
        { category: '기자단', criteria: '직급 선택 - 부회장', score: '3점', edit: '점' },
        { category: '기자단', criteria: '직급 선택 - 참여', score: '2점', edit: '점' },
        { category: '스튜디오 기여', criteria: 'ARS Electronica 작품 제공 학생', score: '2점/건', edit: '점/건' },
        { category: '스터디 그룹', criteria: 'SCG MAV 스꾸딩 스꾸디 S-CAR HIT GDSC SST NPC - 회장', score: '5점', edit: '점' },
        { category: '스터디 그룹', criteria: 'SCG MAV 스꾸딩 스꾸디 S-CAR HIT GDSC SST NPC - 부회장', score: '3점', edit: '점' },
        { category: '스터디 그룹', criteria: 'SCG MAV 스꾸딩 스꾸디 S-CAR HIT GDSC SST NPC - 참여', score: '2점', edit: '점' },

    ]
};

export function DetailSetting() {
    const [selected, setSelected] = useState('');

    const handleToggle = (type) => {
        setSelected(prevSelected => (prevSelected === type ? '' : type));
    };

    return (
        <div className="detail-setting-container">
            <div className="detail-setting-header">
                <h3>세부 항목</h3>
                <div className="button-group">
                    <button className="button-save" style={{ backgroundColor: "#3C3C3C" }}>점수표</button>
                    <button className="button-save">저장</button>
                </div>
            </div>
            <div className="table-container">
                <div className="detail-input-group">
                    <span>LQ</span>
                    <button
                        className={`toggle-button ${selected === 'LQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('LQ')}
                    >
                        {selected === 'LQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>
                <div className="detail-input-group">
                    <span>RQ</span>
                    <button
                        className={`toggle-button ${selected === 'RQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('RQ')}
                    >
                        {selected === 'RQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>
                <div className="detail-input-group">
                    <span>CQ</span>
                    <button
                        className={`toggle-button ${selected === 'CQ' ? 'active' : ''}`}
                        onClick={() => handleToggle('CQ')}
                    >
                        {selected === 'CQ' ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                    </button>
                </div>
                <div className="button-group">
                    <button className="button-secondary">추가</button>
                    <button className="button-secondary">삭제</button>
                    <button className="button-secondary">비교</button>
                </div>
            </div>
            {selected && (
                <div className="detail-table">
                    <table className="detail-table-table">
                        <thead>
                            <tr>
                                <th className="detail-table-th">구분</th>
                                <th className="detail-table-th">산출 기준</th>
                                <th className="detail-table-th">점수</th>
                                <th className="detail-table-th" style={{ backgroundColor: "#8DC63F" }}>점수 수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[selected].map((row, index) => (
                                <tr key={index}>
                                    <td className="detail-table-td">{row.category}</td>
                                    <td className="detail-table-td">{row.criteria}</td>
                                    <td className="detail-table-td">{row.score}</td>
                                    <td className="detail-table-td"><input type="text" placeholder={row.edit} style={{ width: "68px", textAlign: "right" }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
