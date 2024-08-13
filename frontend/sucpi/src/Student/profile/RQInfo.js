import React, { useState, useEffect } from 'react';
import './AccordionItem';

export function RQInfo({ studentRQData, onRQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    // 각 논문 항목별로 상태를 관리하기 위해 배열 사용
    const [categories, setCategories] = useState([]);
    const [grades, setGrades] = useState([]);
    const [papers, setPapers] = useState([]);

    const yulMapping = {
        yulJcr5Main: "JCR 상위 5%이내 학술지(주저)",
        yulJcr5Part: "JCR 상위 5%이내 학술지(공저)",
        yulJcr10Main: "JCR 상위 10%이내 학술지(주저)",
        yulJcr10Part: "JCR 상위 10%이내 학술지(공저)",
        yulJcr20Main: "JCR 상위 20%이내 학술지(주저)",
        yulJcr20Part: "JCR 상위 20%이내 학술지(공저)",
    };

    const myeongMapping = {
        myeongOverKci: "KCI 우수등재 학술지",
        myeongKciExcellent: "KCI 등재",
        myeongKci: "KCI 후보, 기타국제",
        myeongKciCandidate: "KCI 후보, 기타국제",
    };

    useEffect(() => {
        const yulPapers = studentRQData.yul_paper;
        const myeongPapers = studentRQData.myeong_paper;
        let paperList = [];
        let paperGradeList = [];

        // yul_paper 내의 각 키에 대해 논문 제목과 해당 논문의 등급을 함께 저장
        for (const [key, value] of Object.entries(yulPapers)) {
            value.forEach(paper => {
                paperList.push(paper);
                paperGradeList.push(yulMapping[key]); // 논문에 맞는 등급을 설정
            });
        }

        // myeong_paper 내의 각 키에 대해 논문 제목과 해당 논문의 등급을 함께 저장
        for (const [key, value] of Object.entries(myeongPapers)) {
            value.forEach(paper => {
                paperList.push(paper);
                paperGradeList.push(myeongMapping[key]); // 논문에 맞는 등급을 설정
            });
        }

        setPapers(paperList);
        setGrades(paperGradeList);

        // 처음 카테고리는 모두 과학기술계열로 초기화
        const initialCategories = paperList.map((_, index) => {
            // 논문 등급이 yulMapping에 있는 경우 과학기술계열로 설정, 아닌 경우 인문사회계열로 설정
            return Object.values(yulMapping).includes(paperGradeList[index]) ? 'science' : 'humanities';
        });

        setCategories(initialCategories);
    }, [studentRQData]);

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);
    };

    const handleGradeChange = (index, value) => {
        const newGrades = [...grades];
        newGrades[index] = value;
        setGrades(newGrades);
    };

    const getMappedOptions = (category) => {
        if (category === 'science') {
            return Object.entries(yulMapping).map(([key, label]) => ({
                value: key,
                label,
            }));
        } else if (category === 'humanities') {
            return Object.entries(myeongMapping).map(([key, label]) => ({
                value: key,
                label,
            }));
        }
        return [];
    };

    const renderOptions = (options) => {
        return options.map((option) => (
            <option key={option.value} value={option.label}>{option.label}</option>
        ));
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>학술지 논문 게재</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                {papers.map((paper, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                            style={{ width: "120px" }}
                            value={categories[index]}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleGradeChange(index, e.target.value)}
                            value={grades[index]} // 논문 등급을 설정
                        >
                            <option value="">논문 등급</option>
                            {renderOptions(getMappedOptions(categories[index]))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="논문 제목을 입력해 주세요"
                            style={{ resize: "none", overflow: "hidden", width: "100%" }}
                            value={paper}
                            readOnly={!editable}
                        ></textarea>
                    </div>
                ))}
            </div>
            <hr className="divider" />
            {/* 학술대회 발표 및 공모전/ICPC 섹션도 동일하게 처리할 수 있음 */}
        </div>
    );
}
