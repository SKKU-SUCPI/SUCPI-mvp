import React from 'react';
import '../../Student/profile/AccordionItem';

export function AdminCQInfo({ cqInfo }) {

    const coopText = cqInfo.coop || "해당 활동에 대한 이력이 존재하지 않습니다."
    const internshipText = cqInfo.internship || "해당 활동에 대한 이력이 존재하지 않습니다.";
    const startupText = cqInfo.startup || "해당 활동에 대한 이력이 존재하지 않습니다.";
    const ictVolunteerText = cqInfo.overseaVolunteer || "해당 활동에 대한 이력이 존재하지 않습니다.";

    const alimiFields = Object.keys(cqInfo)
    .filter(key => key.startsWith('alimi_') && cqInfo[key] === 1)
    .map(key => {
        const labelMap = {
            alimi_leader: "회장",
            alimi_vice_leader: "부회장",
            alimi_participate: "참여"
        };
        return labelMap[key] || key; // Map to human-readable labels if available
    });
    const alimiText = alimiFields.length > 0 ? alimiFields.join(', ') : '해당없음';

    const councilFields = Object.keys(cqInfo)
    .filter(key => key.startsWith('council_') && cqInfo[key] === 1)
    .map(key => {
        const labelMap = {
            council_leader: "회장",
            council_vice_leader: "부회장",
            council_participate: "참여"
        };
        return labelMap[key] || key; // Map to human-readable labels if available
    });

    const councilText = councilFields.length > 0 ? councilFields.join(', ') : '해당없음';

    const reporterFields = Object.keys(cqInfo)
    .filter(key => key.startsWith('reporter_') && cqInfo[key] === 1)
    .map(key => {
        const labelMap = {
            reporter_leader: "회장",
            reporter_vice_leader: "부회장",
            reporter_participate: "참여"
        };
        return labelMap[key] || key; // Map to human-readable labels if available
    });
    const reporterText = reporterFields.length > 0 ? reporterFields.join(', ') : '해당없음';

    const studyGroupFields = Object.keys(cqInfo)
    .filter(key => key.startsWith('studyGroup_') && cqInfo[key] === 1)
    .map(key => {
        const labelMap = {
            studyGroup_leader: "회장",
            studyGroup_vice_leader: "부회장",
            studyGroup_participate: "참여"
        };
        return labelMap[key] || key;
    });
    const studyGroupText = studyGroupFields.length > 0 ? studyGroupFields.join(', ') : '해당없음';

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
                    value={cqInfo.coop}
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
                {cqInfo.seminar.length > 0 ? (
                        cqInfo.seminar.map((seminarItem, index) => (
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
                        ))
                    ) : (
                        <textarea
                            type='text'
                            className='form-control textarea-expanded'
                            style={{ width: '100%', marginTop: '12px', fontStyle: "italic"}}
                            rows="2"
                            value={"해당 활동에 대한 이력이 존재하지 않습니다."}
                            disabled={true}
                        />
                    )}
                <hr className='divider' />
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>알리미</label>
                    <label>{alimiText}</label>
                </div>
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>학생회</label>
                    <label>{councilText}</label>
                </div>
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>기자단</label>
                    <label>{reporterText}</label>
                </div>
                <hr className='divieder' />
                <label style={{ marginRight: '24px', marginTop: '24px' }}>스튜디오 기여</label>
                    {cqInfo.studioContribution.length > 0 ? (
                        cqInfo.studioContribution.map((studioItem, index) => (
                        <textarea
                            key={index}
                            type='text'
                            className='form-control textarea-expanded'
                            style={{ width: '100%', marginTop: '12px' }}
                            name={`studioContribution_${index}`}
                            rows="2"
                            value={studioItem}
                            disabled={true}
                        />
                        ))
                    ) : (
                        <textarea
                            type='text'
                            className='form-control textarea-expanded'
                            style={{ width: '100%', marginTop: '12px', fontStyle: "italic"}}
                            rows="2"
                            value={"해당 활동에 대한 이력이 존재하지 않습니다"}
                            disabled={true}
                        />
                    )}
                <hr className='divider' />
                <div className="form-group form-group-row" style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                    <label style={{ marginRight: '24px' }}>스터디그룹</label>
                    <label>{studyGroupText}</label>
                </div>                
            </div>
        </div>
    );
}