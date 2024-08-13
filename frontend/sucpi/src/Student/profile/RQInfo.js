import React, { useState, useEffect } from 'react';
import './AccordionItem';

export function RQInfo({ studentRQData, onRQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    const [categories, setCategories] = useState([]);
    const [grades, setGrades] = useState([]);
    const [papers, setPapers] = useState([]);

    const yulMapping = {
        paper: {
            yulJcr5Main: "JCR 상위 5%이내 학술지(주저)",
            yulJcr5Part: "JCR 상위 5%이내 학술지(공저)",
            yulJcr10Main: "JCR 상위 10%이내 학술지(주저)",
            yulJcr10Part: "JCR 상위 10%이내 학술지(공저)",
            yulJcr20Main: "JCR 상위 20%이내 학술지(주저)",
            yulJcr20Part: "JCR 상위 20%이내 학술지(공저)",
        },
        researchContest: {
            yulKnownSpeech: "저명 국제학술대회 발표",
            yulKnownPoster: "저명 국제학술대회 포스터 발표",
            yulNormalSpeech: "일반 국제학술대회 발표",
            yulNormalPoster: "일반 국제학술대회 포스터 발표",
            yulNationalSpeech: "국내 학술대회 발표",
            yulNationalPoster: "국내 학술대회 포스터 발표",
        },
        competition: {
            yulTopBigCompetition: "국제/대규모 공모전 대상",
            yulWinBigCompetition: "국제/대규모 공모전 입상",
            yulPlayBigCompetition: "국제/대규모 공모전 참여",
            yulTopSchoolCompetition: "교내/지역 공모전 대상",
            yulWinSchoolCompetition: "교내/지역 공모전 입상",
            yulPlaySchoolCompetition: "교내/지역 공모전 참여",
        }
    };
    
    const myeongMapping = {
        paper: {
            myeongOverKci: "KCI 우수등재 학술지",
            myeongKciExcellent: "KCI 등재",
            myeongKci: "KCI 후보, 기타국제",
            myeongKciCandidate: "KCI 후보, 기타국제",
        },
        researchContest: {
            myeongKnownSpeech: "저명 국제학술대회 발표",
            myeongNormalSpeech: "일반 국제학술대회 발표",
            myeongNationalSpeech: "국내 학술대회 발표",
        },
        competition: {
            myeongTopBigCompetition: "국제/대규모 공모전 대상",
            myeongWinBigCompetition: "국제/대규모 공모전 입상",
            myeongPlayBigCompetition: "국제/대규모 공모전 참여",
            myeongTopSchoolCompetition: "교내/지역 공모전 대상",
            myeongWinSchoolCompetition: "교내/지역 공모전 입상",
            myeongPlaySchoolCompetition: "교내/지역 공모전 참여",
        }
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
                paperGradeList.push(yulMapping.paper[key]);
            });
        }

        // myeong_paper 내의 각 키에 대해 논문 제목과 해당 논문의 등급을 함께 저장
        for (const [key, value] of Object.entries(myeongPapers)) {
            value.forEach(paper => {
                paperList.push(paper);
                paperGradeList.push(myeongMapping.paper[key]);
            });
        }

        setPapers(paperList);
        setGrades(paperGradeList);

        // 처음 카테고리는 모두 과학기술계열 또는 인문사회계열로 설정
        const initialCategories = paperList.map((_, index) => {
            return Object.values(yulMapping.paper).includes(paperGradeList[index]) ? 'science' : 'humanities';
        });
        setCategories(initialCategories);
    }, [studentRQData]);

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);

        // 카테고리가 변경될 때 grades 배열의 값을 초기화 (옵션이 변경될 수 있기 때문)
        const newGrades = [...grades];
        newGrades[index] = '';
        setGrades(newGrades);
    };

    const handleGradeChange = (index, value) => {
        const newGrades = [...grades];
        newGrades[index] = value;
        setGrades(newGrades);
    };

    const getMappedOptions = (category) => {
        if (category === 'science') {
            return Object.entries(yulMapping.paper).map(([key, label]) => ({
                value: key,
                label,
            }));
        } else if (category === 'humanities') {
            return Object.entries(myeongMapping.paper).map(([key, label]) => ({
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
            {/* 학술지 논문 게재 섹션 */}
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
            <hr className='divider' />
            
        </div>
    );
}
