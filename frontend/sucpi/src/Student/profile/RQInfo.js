import React, { useState, useEffect } from 'react';
import './AccordionItem';

export function RQInfo({ studentRQData, onRQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    const [categories, setCategories] = useState([]);
    const [grades, setGrades] = useState([]);
    const [papers, setPapers] = useState([]);
    const [conferenceCategories, setConferenceCategories] = useState([]);
    const [conferenceGrades, setConferenceGrades] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [competitionCategories, setCompetitionCategories] = useState([]);
    const [competitionGrades, setCompetitionGrades] = useState([]);
    const [competitions, setCompetitions] = useState([]);

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
        const yulConferences = studentRQData.yul_researchContest;
        const myeongConferences = studentRQData.myeong_researchContest;
        const yulCompetitions = studentRQData.yul_competition;
        const myeongCompetitions = studentRQData.myeong_competition;

        let paperList = [];
        let paperGradeList = [];
        let conferenceList = [];
        let conferenceGradeList = [];
        let competitionList = [];
        let competitionGradeList = [];
        let initialCategories = [];
        let initialConferenceCategories = [];
        let initialCompetitionCategories = [];

        // yul_paper 내의 각 키에 대해 논문 제목과 해당 논문의 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(yulPapers)) {
            value.forEach(paper => {
                paperList.push(paper);
                paperGradeList.push(yulMapping.paper[key]);
                initialCategories.push('science');
            });
        }

        // myeong_paper 내의 각 키에 대해 논문 제목과 해당 논문의 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(myeongPapers)) {
            value.forEach(paper => {
                paperList.push(paper);
                paperGradeList.push(myeongMapping.paper[key]);
                initialCategories.push('humanities');
            });
        }

        // yul_researchContest 내의 각 키에 대해 학술대회 발표와 해당 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(yulConferences)) {
            value.forEach(conference => {
                conferenceList.push(conference);
                conferenceGradeList.push(yulMapping.researchContest[key]);
                initialConferenceCategories.push('science');
            });
        }

        // myeong_researchContest 내의 각 키에 대해 학술대회 발표와 해당 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(myeongConferences)) {
            value.forEach(conference => {
                conferenceList.push(conference);
                conferenceGradeList.push(myeongMapping.researchContest[key]);
                initialConferenceCategories.push('humanities');
            });
        }

        // yul_competition 내의 각 키에 대해 공모전/ICPC 제목과 해당 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(yulCompetitions)) {
            value.forEach(competition => {
                competitionList.push(competition);
                competitionGradeList.push(yulMapping.competition[key]);
                initialCompetitionCategories.push('science');
            });
        }

        // myeong_competition 내의 각 키에 대해 공모전/ICPC 제목과 해당 등급, 카테고리를 함께 저장
        for (const [key, value] of Object.entries(myeongCompetitions)) {
            value.forEach(competition => {
                competitionList.push(competition);
                competitionGradeList.push(myeongMapping.competition[key]);
                initialCompetitionCategories.push('humanities');
            });
        }

        setPapers(paperList);
        setGrades(paperGradeList);
        setConferences(conferenceList);
        setConferenceGrades(conferenceGradeList);
        setCompetitions(competitionList);
        setCompetitionGrades(competitionGradeList);
        setCategories(initialCategories);
        setConferenceCategories(initialConferenceCategories);
        setCompetitionCategories(initialCompetitionCategories);
    }, [studentRQData]);

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);

        // 카테고리가 변경될 때 grades 배열의 값을 초기화
        const newGrades = [...grades];
        newGrades[index] = '';
        setGrades(newGrades);
    };

    const handleGradeChange = (index, value) => {
        const newGrades = [...grades];
        newGrades[index] = value;
        setGrades(newGrades);
    };

    const handleConferenceCategoryChange = (index, value) => {
        const newConferenceCategories = [...conferenceCategories];
        newConferenceCategories[index] = value;
        setConferenceCategories(newConferenceCategories);

        // 카테고리가 변경될 때 conferenceGrades 배열의 값을 초기화
        const newConferenceGrades = [...conferenceGrades];
        newConferenceGrades[index] = '';
        setConferenceGrades(newConferenceGrades);
    };

    const handleConferenceGradeChange = (index, value) => {
        const newConferenceGrades = [...conferenceGrades];
        newConferenceGrades[index] = value;
        setConferenceGrades(newConferenceGrades);
    };

    const handleCompetitionCategoryChange = (index, value) => {
        const newCompetitionCategories = [...competitionCategories];
        newCompetitionCategories[index] = value;
        setCompetitionCategories(newCompetitionCategories);

        // 카테고리가 변경될 때 competitionGrades 배열의 값을 초기화
        const newCompetitionGrades = [...competitionGrades];
        newCompetitionGrades[index] = '';
        setCompetitionGrades(newCompetitionGrades);
    };

    const handleCompetitionGradeChange = (index, value) => {
        const newCompetitionGrades = [...competitionGrades];
        newCompetitionGrades[index] = value;
        setCompetitionGrades(newCompetitionGrades);
    };

    const getMappedOptions = (category, type) => {
        if (category === 'science') {
            return Object.entries(yulMapping[type]).map(([key, label]) => ({
                value: key,
                label,
            }));
        } else if (category === 'humanities') {
            return Object.entries(myeongMapping[type]).map(([key, label]) => ({
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
                            {renderOptions(getMappedOptions(categories[index], 'paper'))}
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

            {/* 학술대회 발표 섹션 */}
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>학술대회 발표</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                {conferences.map((conference, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleConferenceCategoryChange(index, e.target.value)}
                            style={{ width: "120px" }}
                            value={conferenceCategories[index]}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleConferenceGradeChange(index, e.target.value)}
                            value={conferenceGrades[index]} // 학술대회 발표 등급을 설정
                        >
                            <option value="">발표 등급</option>
                            {renderOptions(getMappedOptions(conferenceCategories[index], 'researchContest'))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="학술대회명을 입력해 주세요"
                            style={{ resize: "none", overflow: "hidden", width: "100%" }}
                            value={conference}
                            readOnly={!editable}
                        ></textarea>
                    </div>
                ))}
            </div>
            <hr className='divider' />

            {/* 공모전 / ICPC 섹션 */}
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>공모전 / ICPC</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                {competitions.map((competition, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleCompetitionCategoryChange(index, e.target.value)}
                            style={{ width: "120px" }}
                            value={competitionCategories[index]}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleCompetitionGradeChange(index, e.target.value)}
                            value={competitionGrades[index]} // 공모전 등급을 설정
                        >
                            <option value="">공모전 등급</option>
                            {renderOptions(getMappedOptions(competitionCategories[index], 'competition'))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="공모전/ICPC 이름을 입력해 주세요"
                            style={{ resize: "none", overflow: "hidden", width: "100%" }}
                            value={competition}
                            readOnly={!editable}
                        ></textarea>
                    </div>
                ))}
            </div>
        </div>
    );
}
