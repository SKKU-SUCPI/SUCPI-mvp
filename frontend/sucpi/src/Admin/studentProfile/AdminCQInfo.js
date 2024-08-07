import React from 'react';
import '../../Student/profile/AccordionItem';

export function AdminCQInfo() {
    const cqInfo = data.result.cqInfo;

    const internshipText = cqInfo.internship || "(데이터가 존재하지 않습니다.)";
    const startupText = cqInfo.startup || "(데이터가 존재하지 않습니다.)";
    const ictVolunteerText = cqInfo.overseaVolunteer || "(데이터가 존재하지 않습니다.)";

    // Filtering alimi fields with a value of 1
    const alimiFields = Object.keys(cqInfo)
    .filter(key => key.startsWith('alimi_') && cqInfo[key] === 1)
    .map(key => {
        const labelMap = {
            alimi_leader: "회장",
            alimi_vise_leader: "부회장",
            alimi_participate: "참여"
        };
        return labelMap[key] || key; // Map to human-readable labels if available
    });
    const alimiText = alimiFields.length > 0 ? alimiFields.join(', ') : '해당없음';



    return (
        <div className='form-container' style={{ whiteSpace: "nowrap" }}>
            <div className='form-group form-group-column'>
                <label style={{ marginRight: '24px' }}>산학프로젝트</label>
                <textarea
                    type='text'
                    className='form-control textarea-expanded'
                    style={{ width: '100%' }}
                    name='coop'
                    rows="2"
                    value={data.result.cqInfo.coop}
                    disabled={true}
                />
                <label style={{ marginRight: '24px', marginTop: '24px' }}>인턴십</label>
                <textarea
                    type='text'
                    className='form-control textarea-expanded'
                    style={{ width: '100%' }}
                    name='internship'
                    rows="2"
                    value={internshipText}
                    disabled={true}
                />
                <label style={{ marginRight: '24px', marginTop: '24px' }}>창업</label>
                <textarea
                    type='text'
                    className='form-control textarea-expanded'
                    style={{ width: '100%' }}
                    name='startup'
                    rows="2"
                    value={startupText}
                    disabled={true}
                />
                <label style={{ marginRight: '24px', marginTop: '24px' }}>해외 봉사 활동</label>
                <textarea
                    type='text'
                    className='form-control textarea-expanded'
                    style={{ width: '100%' }}
                    name='ictVolunteer'
                    rows="2"
                    value={ictVolunteerText}
                    disabled={true}
                />
                <hr className='divider' />
                <label style={{ marginRight: '24px', marginTop: '24px' }}>화상 강연 / 세미나 참여</label>
                {data.result.cqInfo.seminar.map((seminarItem, index) => (
                    <textarea
                        key={index}
                        type='text'
                        className='form-control textarea-expanded'
                        style={{ width: '100%', marginTop: '12px' }}
                        name={`seminar_${index}`}
                        rows="2"
                        value={seminarItem}
                        disabled={true}
                    />
                ))}
                <hr className='divider' />
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>알리미</label>
                    <textarea
                        type='text'
                        className='form-control textarea-expanded'
                        style={{ width: '40%', textAlign: 'center' }}
                        name='alimi'
                        value={alimiText}
                        disabled={true}
                    />
                </div>
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>학생회</label>
                    <textarea
                        type='text'
                        className='form-control textarea-expanded'
                        style={{ width: '40%', textAlign: 'center' }}
                        name='alimi'
                        value={alimiText}
                        disabled={true}
                    />
                </div>
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>기자단</label>
                    <textarea
                        type='text'
                        className='form-control textarea-expanded'
                        style={{ width: '40%', textAlign: 'center' }}
                        name='alimi'
                        value={alimiText}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    );
}

// 더미 데이터
const data = {
    "status": 200,
    "message": "Student details retrieved successfully",
    "result": {
        "cqInfo": {
            "coop": "2022년 웅진 씽크빅에서 게임봇 및 챗봇을 개발하였습니다.",
            "internship": "",
            "startup": "",
            "overseaVolunteer": "2024 하계 ICT 해외봉사를 다녀왔습니다.",
            "seminar": ["AWS Korea의 강연을 들었습니다.", "Meta의 강연을 들었습니다."],
            "alimi_leader": 0,
            "alimi_vise_leader": 0,
            "alimi_participate": 1,
            "council_leader": 1,
            "council_vise_leader": 0,
            "council_particiapte": 0,
            "reporter_leader": 1,
            "reporter_vise_leader": 0,
            "reporter_participate": 0,
            "studioContribution": ["ARS Electronica 작품을 제작하였습니다."],
            "studyGroup_leader": 0,
            "studyGroup_vise_leader": 1,
            "studyGroup_participate": 0
        },
        "studentInfo": {
            "Id": "2020123123",
            "major": "SW",
            "name": "홍길동",
            "phone": "010-1234-5678"
        },
        "RQInfo": {
            "RQYulNationalPoster": 0,
            "RQYulPlaySchoolCompetition": 0,
            "RQYulWinBigCompetition": 0,
            "RQYulJcr10Main": 0,
            "RQMyeongNationalSpeech": 0,
            "RQMyeongBigCompetition": 0,
            "RQYulJcr5Main": 0,
            "RQYulKnownSpeech": 0,
            "RQYulPlayBigCompetition": 0,
            "RQYulNormalSpeech": 0,
            "RQYulJcr5Part": 0,
            "RQMyeongNormalSpeech": 0,
            "RQYulJcr20Part": 0,
            "RQMyeongOverKci": 0,
            "RQYulNationalSpeech": 0,
            "RQYulJcr20Main": 0,
            "RQMyeongKnownSpeech": 0,
            "RQYulKnownPoster": 0,
            "RQYulNormalPoster": 0,
            "RQMyeongKciExcellent": 0,
            "RQMyeongSchoolCompetition": 0,
            "RQYulJcr10Part": 0,
            "RQYulWinSchoolCompetition": 0,
            "RQMyeongKci": 0,
            "RQMyeongKciCandidate": 0
        },
        "lqInfo": {
            "studentId": "20220020",
            "activityEdu": 2,
            "activityTA": 1,
            "grade40TO45": 1,
            "grade35TO40": 0,
            "grade30TO35": 0,
            "grade00TO30": 0,
            "openSourceActivityStar0": 0,
            "openSourceActivityStar3": 0,
            "openSourceActivityStar4": 1,
            "openSourceActivityStar5": 0,
            "committerStar0": 0,
            "committerStar3": 1,
            "committerStar4": 0,
            "committerStar5": 0,
            "contents": [
                {
                    "id": 346,
                    "studentId": "20200020",
                    "dataname": "activityEdu",
                    "contents": "고등학교에서 인공지능 기초 교육을 진행했습니다."
                },
                {
                    "id": 347,
                    "studentId": "20200020",
                    "dataname": "activityEdu",
                    "contents": "고등학교에서 파이썬 기초 교육을 진행했습니다."
                },
                {
                    "id": 348,
                    "studentId": "20200020",
                    "dataname": "activityTA",
                    "contents": "인공지능 개론 조교를 수행했습니다."
                }
            ]
        }
    }
};