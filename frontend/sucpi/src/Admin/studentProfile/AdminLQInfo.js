import React, { useEffect } from "react";

export function AdminLQInfo({ lqInfo }) {

    const eduContents = [
        "고등학교에서 인공지능 기초 교육을 진행했습니다.",
        "고등학교에서 파이썬 기초 교육을 진행했습니다."
    ];

    useEffect(() => {
        console.log("LQ Info:", lqInfo);
    }, [lqInfo]);

    if (!lqInfo) {
        return <div>교과활동 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="form-container">
            <div className="form-group form-group-row">
                <label>학점</label>
                <select
                    className="form-control"
                    name="grade"
                    value={"3.5To3.49"}
                    disabled={true}
                >
                    <option value="">성적 입력</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
            <hr className='divider' />
            <div className="form-group form-group-column">
                <div className="label-and-button">
                    <label>교내ㆍ외 교육 활동</label>
                </div>
                {eduContents.map((item, index) => (
                    <textarea
                        key={index}
                        className='form-control textarea-expanded'
                        rows="2"
                        name={`activityEdu_${index}`}
                        value={item}
                        disabled={true}
                    ></textarea>
                ))}
            </div>
            <hr className='divider' />
            <div className="form-group form-group-column">
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                </div>
                {eduContents.map((item, index) => (
                    <textarea
                        key={index}
                        className='form-control textarea-expanded'
                        rows="2"
                        name={`activityEdu_${index}`}
                        value={item}
                        disabled={true}
                    ></textarea>
                ))}
            </div>
            <hr className='divider' />
            <div className="form-group form-group-row" style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>오픈소스커뮤니티 생성 및 활성도</label>
                <select
                    className="form-control"
                    name="grade"
                    value={"4"}
                    disabled={true}
                >
                    <option value="0">0점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                </select>
            </div>
            <hr className='divider' />
            <div className="form-group form-group-row" style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>커미터로서의 활동</label>
                <select
                    className="form-control"
                    name="grade"
                    value={"3"}
                    disabled={true}
                >
                    <option value="0">0점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                </select>
            </div>
        </div>
    );
}