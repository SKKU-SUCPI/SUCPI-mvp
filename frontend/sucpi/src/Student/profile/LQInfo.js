import React, { useEffect } from "react";

export function LQInfo({ studentLQData, onLQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onLQDataChange(name, value);
    };

    const handleGradeChange = (event) => {
        const { value } = event.target;
        const newGrade = {
            grade40TO45: value === "grade40TO45" ? 1 : 0,
            grade35TO40: value === "grade35TO40" ? 1 : 0,
            grade30TO35: value === "grade30TO35" ? 1 : 0,
            grade00TO30: value === "grade00TO30" ? 1 : 0,
        };
        onLQDataChange("LQGrade", value);
        onLQDataChange("grade40TO45", newGrade.grade40TO45);
        onLQDataChange("grade35TO40", newGrade.grade35TO40);
        onLQDataChange("grade30TO35", newGrade.grade30TO35);
        onLQDataChange("grade00TO30", newGrade.grade00TO30);
    };

    // 학점 데이터를 기반으로 기본값 설정
    const getDefaultGradeValue = () => {
        if (studentLQData.grade40TO45 === 1) return "grade40TO45";
        if (studentLQData.grade35TO40 === 1) return "grade35TO40";
        if (studentLQData.grade30TO35 === 1) return "grade30TO35";
        if (studentLQData.grade00TO30 === 1) return "grade00TO30";
        return "";
    };

    // 오픈소스 커뮤니티 활성도 기본값 설정
    const getDefaultOpenSourceValue = () => {
        if (studentLQData.openSourceActivityStar5 === 1) return "5";
        if (studentLQData.openSourceActivityStar4 === 1) return "4";
        if (studentLQData.openSourceActivityStar3 === 1) return "3";
        if (studentLQData.openSourceActivityStar0 === 1) return "0";
        return "";
    };

    const handleOpenSourceChange = (event) => {
        const { value } = event.target;
        const newOpenSource = {
            openSourceActivityStar5: value === "5" ? 1 : 0,
            openSourceActivityStar4: value === "4" ? 1 : 0,
            openSourceActivityStar3: value === "3" ? 1 : 0,
            openSourceActivityStar0: value === "0" ? 1 : 0,
        };
        onLQDataChange("openSourceActivityStar5", newOpenSource.openSourceActivityStar5);
        onLQDataChange("openSourceActivityStar4", newOpenSource.openSourceActivityStar4);
        onLQDataChange("openSourceActivityStar3", newOpenSource.openSourceActivityStar3);
        onLQDataChange("openSourceActivityStar0", newOpenSource.openSourceActivityStar0);
    };

    // 커미터로서의 활동 기본값 설정
    const getDefaultCommitterValue = () => {
        if (studentLQData.committerStar5 === 1) return "5";
        if (studentLQData.committerStar4 === 1) return "4";
        if (studentLQData.committerStar3 === 1) return "3";
        if (studentLQData.committerStar0 === 1) return "0";
        return "";
    };

    const handleCommitterChange = (event) => {
        const { value } = event.target;
        const newCommitter = {
            committerStar5: value === "5" ? 1 : 0,
            committerStar4: value === "4" ? 1 : 0,
            committerStar3: value === "3" ? 1 : 0,
            committerStar0: value === "0" ? 1 : 0,
        };
        onLQDataChange("committerStar5", newCommitter.committerStar5);
        onLQDataChange("committerStar4", newCommitter.committerStar4);
        onLQDataChange("committerStar3", newCommitter.committerStar3);
        onLQDataChange("committerStar0", newCommitter.committerStar0);
    };

    // 활동 추가 함수
    const handleAddActivity = (fieldName) => {
        const newActivities = [...studentLQData[fieldName], ""];
        onLQDataChange(fieldName, newActivities);
    };

    // 활동 내용 변경 함수
    const handleActivityChange = (fieldName, index, event) => {
        const newActivities = [...studentLQData[fieldName]];
        newActivities[index] = event.target.value;
        onLQDataChange(fieldName, newActivities);
    };

    // 활동 삭제 함수
    const handleRemoveActivity = (fieldName, index) => {
        const newActivities = studentLQData[fieldName].filter((_, i) => i !== index);
        onLQDataChange(fieldName, newActivities);
    };

    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>학점</label>
                <select
                    className='form-control'
                    name="LQGrade"
                    value={getDefaultGradeValue()}
                    onChange={handleGradeChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="">성적 입력</option>
                    <option value="grade40TO45">4.0~4.5</option>
                    <option value="grade35TO40">3.5~3.99</option>
                    <option value="grade30TO35">3.0~3.49</option>
                    <option value="grade00TO30">~2.99</option>
                </select>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교내ㆍ외 교육 활동</label>
                    <button className='add-item' onClick={() => handleAddActivity("activityEdu")} disabled={!editable}>
                        항목 추가
                    </button>
                </div>
                {studentLQData.activityEdu.map((activity, index) => (
                    <div key={index} className='form-group form-group-row' style={{ width: "90%" }}>
                        <textarea
                            className='form-control'
                            rows="1"
                            name={`activityEdu_${index}`}
                            value={activity}
                            placeholder="활동 내용을 입력해 주세요."
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            onChange={(e) => handleActivityChange("activityEdu", index, e)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveActivity("activityEdu", index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                    <button className='add-item' onClick={() => handleAddActivity("activityTA")} disabled={!editable}>
                        항목 추가
                    </button>
                </div>
                {studentLQData.activityTA.map((activity, index) => (
                    <div key={index} className='form-group form-group-row' style={{ width: "90%" }}>
                        <textarea
                            className='form-control'
                            rows="1"
                            name={`activityTA_${index}`}
                            value={activity}
                            placeholder="활동 내용을 입력해 주세요."
                            style={{ ...inputStyle, resize: "none", overflow: "hidden", width: "100%" }}
                            onChange={(e) => handleActivityChange("activityTA", index, e)}
                            disabled={!editable}
                        ></textarea>
                        {editable && (
                            <button 
                                className='remove-item' 
                                onClick={() => handleRemoveActivity("activityTA", index)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <hr className='divider' />
            <div className='form-group form-group-row' style={{ gap: "200px" }}>
                <label style={{ whiteSpace: "nowrap" }}>오픈소스 커뮤니티 활성도</label>
                <select
                    className='form-control'
                    name="OpenSourceActivity"
                    value={getDefaultOpenSourceValue()}
                    onChange={handleOpenSourceChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="0">0점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                </select>
            </div>
            <hr className='divider' />
            <div className='form-group form-group-row' style={{ gap: "200px" }}>
                <label style={{ whiteSpace: "nowrap" }}>커미터로서의 활동</label>
                <select
                    className='form-control'
                    name="CommitterActivity"
                    value={getDefaultCommitterValue()}
                    onChange={handleCommitterChange}
                    disabled={!editable}
                    style={inputStyle}
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
