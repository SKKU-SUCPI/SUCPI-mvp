import '../../Student/profile/AccordionItem'

export function AdminRQInfo({ rqInfo })
{
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
    
    const renderPaperSection = (mapping, paperData) => {
        return Object.keys(mapping.paper).map((key) => {
            if (paperData[key] && paperData[key].length > 0) {
                return (
                    <div key={key} className="form-group form-group-row" style={{ gap: '16px', alignItems: 'flex-start', whiteSpace: 'nowrap' }}>
                        <label style={{ marginRight: '48px', whiteSpace: 'nowrap', textAlign: 'left', minWidth: '200px' }}>{mapping.paper[key]}</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
                            {paperData[key].map((item, index) => (
                                <textarea
                                    key={index}
                                    className="form-control textarea-expanded"
                                    rows="2"
                                    value={item}
                                    disabled
                                    style={{ resize: "none", width: "400px", overflow: "hidden", padding: "8px" }}
                                ></textarea>
                            ))}
                        </div>
                    </div>
                );
            }
            return null;
        });
    };

    const renderResearchContestSection = (mapping, researchData) => {
        return Object.keys(mapping.researchContest).map((key) => {
            if (researchData[key] && researchData[key].length > 0) {
                return (
                    <div key={key} className="form-group form-group-row" style={{ gap: '16px', alignItems: 'flex-start', whiteSpace: 'nowrap' }}>
                        <label style={{ marginRight: '48px', whiteSpace: 'nowrap', textAlign: 'left', minWidth: '200px' }}>{mapping.researchContest[key]}</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
                            {researchData[key].map((item, index) => (
                                <textarea
                                    key={index}
                                    className="form-control textarea-expanded"
                                    rows="2"
                                    value={item}
                                    disabled
                                    style={{ resize: "none", width: "400px", overflow: "hidden", padding: "8px" }}
                                ></textarea>
                            ))}
                        </div>
                    </div>
                );
            }
            return null;
        });
    };

    const renderCompetitionSection = (mapping, competitionData) => {
        return Object.keys(mapping.competition).map((key) => {
            if (competitionData[key] && competitionData[key].length > 0) {
                return (
                    <div key={key} className="form-group form-group-row" style={{ gap: '16px', alignItems: 'flex-start', whiteSpace: 'nowrap' }}>
                        <label style={{ marginRight: '48px', whiteSpace: 'nowrap', textAlign: 'left', minWidth: '200px' }}>{mapping.competition[key]}</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
                            {competitionData[key].map((item, index) => (
                                <textarea
                                    key={index}
                                    className="form-control textarea-expanded"
                                    rows="2"
                                    value={item}
                                    disabled
                                    style={{ resize: "none", width: "400px", overflow: "hidden", padding: "8px" }}
                                ></textarea>
                            ))}
                        </div>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="form-container">
            <div className="form-group form-group-column" style={{ display: 'flex', justifyContent: 'space-between' }} >
                <div className="label-and-button" style={{ marginBottom: "40px" }}>
                    <label style={{ fontSize: "24px"}}>학술지 논문 게재</label>
                </div>
                {rqInfo.campus === 'yul'
                    ? renderPaperSection(yulMapping, rqInfo.yul_paper)
                    : renderPaperSection(myeongMapping, rqInfo.myeong_paper)}
                <hr className='divider' />
                <div className="label-and-button" style={{ marginBottom: "40px" }}>
                    <label style={{ fontSize: "24px"}}>학술 대회 발표</label>
                </div>
                {rqInfo.campus === 'yul'
                    ? renderResearchContestSection(yulMapping, rqInfo.yul_researchContest)
                    : renderResearchContestSection(myeongMapping, rqInfo.myeong_researchContest)}
                <hr className='divider' />
                <div className="label-and-button" style={{ marginBottom: "40px" }}>
                    <label style={{ fontSize: "24px"}}>공모전 / ICPC</label>
                </div>
                {rqInfo.campus === 'yul'
                    ? renderCompetitionSection(yulMapping, rqInfo.yul_competition)
                    : renderCompetitionSection(myeongMapping, rqInfo.myeong_competition)}
            </div>
        </div>
    );
}