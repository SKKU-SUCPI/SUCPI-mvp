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
        loadData();
    }, [studentRQData]);

    const loadData = () => {
        const yulPapers = studentRQData.yul_paper || {};
        const myeongPapers = studentRQData.myeong_paper || {};
        const yulConferences = studentRQData.yul_researchContest || {};
        const myeongConferences = studentRQData.myeong_researchContest || {};
        const yulCompetitions = studentRQData.yul_competition || {};
        const myeongCompetitions = studentRQData.myeong_competition || {};

        let paperList = [];
        let paperGradeList = [];
        let conferenceList = [];
        let conferenceGradeList = [];
        let competitionList = [];
        let competitionGradeList = [];
        let initialCategories = [];
        let initialConferenceCategories = [];
        let initialCompetitionCategories = [];

        for (const [key, value] of Object.entries(yulPapers)) {
            if (Array.isArray(value)) {
                value.forEach(paper => {
                    paperList.push(paper);
                    paperGradeList.push(yulMapping.paper[key]);
                    initialCategories.push('science');
                });
            }
        }

        for (const [key, value] of Object.entries(myeongPapers)) {
            if (Array.isArray(value)) {
                value.forEach(paper => {
                    paperList.push(paper);
                    paperGradeList.push(myeongMapping.paper[key]);
                    initialCategories.push('humanities');
                });
            }
        }

        for (const [key, value] of Object.entries(yulConferences)) {
            if (Array.isArray(value)) {
                value.forEach(conference => {
                    conferenceList.push(conference);
                    conferenceGradeList.push(yulMapping.researchContest[key]);
                    initialConferenceCategories.push('science');
                });
            }
        }

        for (const [key, value] of Object.entries(myeongConferences)) {
            if (Array.isArray(value)) {
                value.forEach(conference => {
                    conferenceList.push(conference);
                    conferenceGradeList.push(myeongMapping.researchContest[key]);
                    initialConferenceCategories.push('humanities');
                });
            }
        }

        for (const [key, value] of Object.entries(yulCompetitions)) {
            if (Array.isArray(value)) {
                value.forEach(competition => {
                    competitionList.push(competition);
                    competitionGradeList.push(yulMapping.competition[key]);
                    initialCompetitionCategories.push('science');
                });
            }
        }

        for (const [key, value] of Object.entries(myeongCompetitions)) {
            if (Array.isArray(value)) {
                value.forEach(competition => {
                    competitionList.push(competition);
                    competitionGradeList.push(myeongMapping.competition[key]);
                    initialCompetitionCategories.push('humanities');
                });
            }
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
    };

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);

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

        const newCompetitionGrades = [...competitionGrades];
        newCompetitionGrades[index] = '';
        setCompetitionGrades(newCompetitionGrades);
    };

    const handleCompetitionGradeChange = (index, value) => {
        const newCompetitionGrades = [...competitionGrades];
        newCompetitionGrades[index] = value;
        setCompetitionGrades(newCompetitionGrades);
    };

    const handleInputChange = (type, index, value) => {
        if (type === 'paper') {
            const newPapers = [...papers];
            newPapers[index] = value;
            setPapers(newPapers);
            // onRQDataChange('yul_paper', newPapers);
        } else if (type === 'conference') {
            const newConferences = [...conferences];
            newConferences[index] = value;
            setConferences(newConferences);
            // onRQDataChange('yul_researchContest', newConferences);
        } else if (type === 'competition') {
            const newCompetitions = [...competitions];
            newCompetitions[index] = value;
            setCompetitions(newCompetitions);
            // onRQDataChange('yul_competition', newCompetitions);
        }
    };

    const handleAddActivity = (type) => {
        if (type === 'paper') {
            setPapers([...papers, '']);
            setGrades([...grades, '']);
            setCategories([...categories, 'science']);
        } else if (type === 'conference') {
            setConferences([...conferences, '']);
            setConferenceGrades([...conferenceGrades, '']);
            setConferenceCategories([...conferenceCategories, 'science']);
        } else if (type === 'competition') {
            setCompetitions([...competitions, '']);
            setCompetitionGrades([...competitionGrades, '']);
            setCompetitionCategories([...competitionCategories, 'science']);
        }
    };

    const handleRemoveActivity = (type, index) => {
        if (type === 'paper') {
            const newPapers = papers.filter((_, i) => i !== index);
            const newGrades = grades.filter((_, i) => i !== index);
            const newCategories = categories.filter((_, i) => i !== index);
            setPapers(newPapers);
            setGrades(newGrades);
            setCategories(newCategories);
        } else if (type === 'conference') {
            const newConferences = conferences.filter((_, i) => i !== index);
            const newConferenceGrades = conferenceGrades.filter((_, i) => i !== index);
            const newConferenceCategories = conferenceCategories.filter((_, i) => i !== index);
            setConferences(newConferences);
            setConferenceGrades(newConferenceGrades);
            setConferenceCategories(newConferenceCategories);
        } else if (type === 'competition') {
            const newCompetitions = competitions.filter((_, i) => i !== index);
            const newCompetitionGrades = competitionGrades.filter((_, i) => i !== index);
            const newCompetitionCategories = competitionCategories.filter((_, i) => i !== index);
            setCompetitions(newCompetitions);
            setCompetitionGrades(newCompetitionGrades);
            setCompetitionCategories(newCompetitionCategories);
        }
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
                    <button 
                        className='add-item' 
                        onClick={() => handleAddActivity('paper')} 
                        disabled={!editable}
                    >
                        항목 추가
                    </button>
                </div>
                {papers.map((paper, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                            style={{ ...inputStyle, width: "120px" }}
                            value={categories[index]}
                            disabled={!editable}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleGradeChange(index, e.target.value)}
                            style={{ ...inputStyle }}
                            value={grades[index]} // 논문 등급을 설정
                            disabled={!editable}
                        >
                            <option value="">논문 등급</option>
                            {renderOptions(getMappedOptions(categories[index], 'paper'))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="논문 제목을 입력해 주세요"
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            value={paper}
                            onChange={(e) => handleInputChange('paper', index, e.target.value)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveActivity('paper', index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />

            {/* 학술대회 발표 섹션 */}
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>학술대회 발표</label>
                    <button 
                        className='add-item' 
                        onClick={() => handleAddActivity('conference')} 
                        disabled={!editable}
                    >
                        항목 추가
                    </button>
                </div>
                {conferences.map((conference, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleConferenceCategoryChange(index, e.target.value)}
                            style={{ ...inputStyle, width: "120px" }}
                            value={conferenceCategories[index]}
                            disabled={!editable}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleConferenceGradeChange(index, e.target.value)}
                            value={conferenceGrades[index]} // 학술대회 발표 등급을 설정
                            style={{ ...inputStyle }}
                            disabled={!editable}
                        >
                            <option value="">발표 등급</option>
                            {renderOptions(getMappedOptions(conferenceCategories[index], 'researchContest'))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="학술대회명을 입력해 주세요"
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            value={conference}
                            readOnly={!editable}
                            onChange={(e) => handleInputChange('conference', index, e.target.value)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveActivity('conference', index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />

            {/* 공모전 / ICPC 섹션 */}
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>공모전 / ICPC</label>
                    <button 
                        className='add-item' 
                        onClick={() => handleAddActivity('competition')} 
                        disabled={!editable}
                    >
                        항목 추가
                    </button>
                </div>
                {competitions.map((competition, index) => (
                    <div className='form-group form-group-row' key={index}>
                        <select
                            className='form-control'
                            onChange={(e) => handleCompetitionCategoryChange(index, e.target.value)}
                            style={{ ...inputStyle, width: "120px" }}
                            value={competitionCategories[index]}
                            disabled={!editable}
                        >
                            <option value="">계열 선택</option>
                            <option value="humanities">인문사회계열</option>
                            <option value="science">과학기술계열</option>
                        </select>
                        <select
                            className='form-control fixed-width'
                            onChange={(e) => handleCompetitionGradeChange(index, e.target.value)}
                            style={{ ...inputStyle }}
                            value={competitionGrades[index]} // 공모전 등급을 설정
                            disabled={!editable}
                        >
                            <option value="">공모전 등급</option>
                            {renderOptions(getMappedOptions(competitionCategories[index], 'competition'))}
                        </select>
                        <textarea
                            className='form-control'
                            rows="1"
                            placeholder="공모전/ICPC 이름을 입력해 주세요"
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            value={competition}
                            readOnly={!editable}
                            onChange={(e) => handleInputChange('competition', index, e.target.value)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveActivity('competition', index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
