import React, { useEffect } from "react";
import '../../Student/profile/AccordionItem'

export function AdminLQInfo({ lqInfo }) {

    useEffect(() => {
        console.log("LQ Info:", lqInfo);
    }, [lqInfo]);

    if (!lqInfo) {
        return <div>교과활동 정보를 불러오는 데 실패했습니다.</div>;
    }

    function getGradeRange(lqInfo) {
        if (lqInfo.grade40TO45 === 1) return "4.0이상 4.5이하";
        if (lqInfo.grade35TO40 === 1) return "3.5이상 3.99이하";
        if (lqInfo.grade30TO35 === 1) return "3.0이상 3.49이하";
        if (lqInfo.grade00TO30 === 1) return "2.99이하";
        return "N/A"
    }

    function getOSScore(lqInfo) {
        if (lqInfo.openSourceActivityStar5 === 1) return "5점";
        if (lqInfo.openSourceActivityStar4 === 1) return "4점";
        if (lqInfo.openSourceActivityStar3 === 1) return "3점";
        if (lqInfo.openSourceActivityStar0 === 1) return "0점";
        return "N/A"
    }

    function getCommitterStar(lqInfo) {
        if (lqInfo.committerStar5 === 1) return "5점";
        if (lqInfo.committerStar4 === 1) return "4점";
        if (lqInfo.committerStar3 === 1) return "3점";
        if (lqInfo.committerStar0 === 1) return "0점";
        return "N/A"        
    }

    return (
        <div className="form-container">
            <div className="form-group form-group-row">
                <label>학점</label>
                <label style={{ whiteSpace: "nowrap" }}>{getGradeRange(lqInfo)}</label>
            </div>
            <hr className='divider' />
            <div className="form-group form-group-column">
                <div className="label-and-button">
                    <label>교내ㆍ외 교육 활동</label>
                </div>
                {lqInfo.activityEdu.length > 0 ? (
                    lqInfo.activityEdu.map((item, index) => (
                        <textarea
                            key={index}
                            className='form-control textarea-expanded'
                            rows="2"
                            name={`activityEdu_${index}`}
                            value={item}
                            disabled={true}
                        ></textarea>
                    ))
                ) : (
                    <textarea
                        className='form-control textarea-expanded'
                        rows="2"
                        value="해당 활동에 대한 이력이 존재하지 않습니다"
                        disabled={true}
                        style={{ fontStyle: "italic" }}
                    ></textarea>
                )}
                </div>
            <hr className='divider' />
            <div className="form-group form-group-column">
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                </div>
                {lqInfo.activityTA.length > 0 ? (
                    lqInfo.activityTA.map((item, index) => (
                        <textarea
                            key={index}
                            className='form-control textarea-expanded'
                            rows="2"
                            name={`activityEdu_${index}`}
                            value={item}
                            disabled={true}
                        ></textarea>
                    ))
                ) : (
                    <textarea
                        className='form-control textarea-expanded'
                        rows="2"
                        value="해당 활동에 대한 이력이 존재하지 않습니다"
                        disabled={true}
                        style={{ fontStyle: "italic" }}
                    ></textarea>
                )}
            </div>
            <hr className='divider' />
            <div className="form-group form-group-row" style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>오픈소스커뮤니티 생성 및 활성도</label>
                <label>{getOSScore(lqInfo)}</label>
            </div>
            <hr className='divider' />
            <div className="form-group form-group-row" style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>커미터로서의 활동</label>
                <label>{getCommitterStar(lqInfo)}</label>
            </div>
        </div>
    );
}