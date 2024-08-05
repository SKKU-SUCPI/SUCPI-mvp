import React, { useEffect } from "react";

export function LQInfo({ studentLQData, onLQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    // 학점 추출 및 설정
    useEffect(() => {
        const { grade40TO45, grade35TO40, grade30TO35, grade00TO30, LQGrade } = studentLQData;
        let selectedGrade = "";

        if (grade40TO45 === 1) {
            selectedGrade = "4To4.5";
        } else if (grade35TO40 === 1) {
            selectedGrade = "3.5To3.99";
        } else if (grade30TO35 === 1) {
            selectedGrade = "3.0To3.49";
        } else if (grade00TO30 === 1) {
            selectedGrade = "~2.99";
        }

        // LQGrade가 현재 선택된 값과 다른 경우에만 업데이트
        if (selectedGrade && selectedGrade !== LQGrade) {
            onLQDataChange("LQGrade", selectedGrade);
        }
    }, [studentLQData.grade40TO45, studentLQData.grade35TO40, studentLQData.grade30TO35, studentLQData.grade00TO30, studentLQData.LQGrade, onLQDataChange]);

    // 오픈소스활성도 추출 및 설정
    useEffect(() => {
        const { openSourceActivityStar0, openSourceActivityStar3, openSourceActivityStar4, openSourceActivityStar5, OpenSourceActivity } = studentLQData;
        let selectedOSStar = "";
        
        if (openSourceActivityStar5 == 1) {
            selectedOSStar = "5";
        } else if (openSourceActivityStar4 == 1) {
            selectedOSStar = "4";
        } else if (openSourceActivityStar3 == 1) {
            selectedOSStar = "3";
        } else if (openSourceActivityStar0 == 1) {
            selectedOSStar = "0";
        }
        // OpenSourceActivity가 현재 선택된 값과 다른 경우에만 업데이트
        if (selectedOSStar && selectedOSStar !== OpenSourceActivity) {
            onLQDataChange("OpenSourceActivity", selectedOSStar);
        }
    }, [studentLQData, onLQDataChange]);

    // 커미터 추출 및 설정
    useEffect(() => {
        const { committerStar0, committerStar3, committerStar4, committerStar5, CommitterActivity } = studentLQData;
        let selectedCommitter = "";

        if (committerStar5 == 1) {
            selectedCommitter = "5";
        } else if (committerStar4 == 1) {
            selectedCommitter = "4";
        } else if (committerStar3 == 1) {
            selectedCommitter = "3";
        } else if (committerStar0 == 1) {
            selectedCommitter = "0";
        }

        if (selectedCommitter && selectedCommitter !== CommitterActivity) {
            onLQDataChange("CommitterActivity", selectedCommitter);
        }
    }, [studentLQData, onLQDataChange]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        onLQDataChange(name, value);
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        onLQDataChange(name, value);
    };

    // 컨텐츠 필터링
    const eduContents = studentLQData.contents.filter(item => item.dataname === "activityEdu");
    const TAContents = studentLQData.contents.filter(item => item.dataname === "activityTA");

    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>학점</label>
                <select
                    className='form-control'
                    name="LQGrade"
                    value={studentLQData.LQGrade}
                    onChange={handleSelectChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="">성적 입력</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교내ㆍ외 교육 활동</label>
                    <button className='add-item' disabled={!editable}>항목 추가</button>
                </div>
                {eduContents.map((item, index) => (
                    <textarea
                        key={index}
                        className='form-control textarea-expanded'
                        rows="2"
                        name={`activityEdu_${index}`}
                        value={item.contents}
                        onChange={handleTextChange}
                        disabled={!editable}
                        style={inputStyle}
                    ></textarea>
                ))}
            </div>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                    <button className='add-item' disabled={!editable}>항목 추가</button>
                </div>
                {TAContents.map((item, index) => (
                    <textarea
                        key={index}
                        className='form-control textarea-expanded'
                        rows="2"
                        name={`activityTA_${index}`}
                        value={item.contents}
                        onChange={handleTextChange}
                        disabled={!editable}
                        style={inputStyle}
                    ></textarea>
                ))}
            </div>
            <div className='form-group form-group-row' style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>오픈소스커뮤니티 생성 및 활성도</label>
                <select
                    className='form-control'
                    name="OpenSourceActivity"
                    value={studentLQData.OpenSourceActivity}
                    onChange={handleSelectChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="0">0점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                </select>
            </div>
            <div className='form-group form-group-row' style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>커미터로서의 활동</label>
                <select
                    className='form-control'
                    name="CommitterActivity"
                    value={studentLQData.CommitterActivity}
                    onChange={handleSelectChange}
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
