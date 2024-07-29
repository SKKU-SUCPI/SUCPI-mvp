import './AccordionItem'

export function LQInfo({ studentLQData, onLQDataChange, editable }) {
    const inputStyle = editable ? { backgroundColor: 'white' } : {};

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        onLQDataChange(name, value);
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        onLQDataChange(name, value);
    };

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
                <textarea
                    className='form-control textarea-expanded'
                    rows="2"
                    name="LQEduActivity1"
                    value={studentLQData.LQEduActivity1}
                    onChange={handleTextChange}
                    disabled={!editable}
                    style={inputStyle}
                ></textarea>
            </div>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                    <button className='add-item' disabled={!editable}>항목 추가</button>
                </div>
                <textarea
                    className='form-control textarea-expanded'
                    rows="2"
                    name="LQEduActivity2"
                    value={studentLQData.LQEduActivity2}
                    onChange={handleTextChange}
                    disabled={!editable}
                    style={inputStyle}
                ></textarea>
            </div>
            <div className='form-group form-group-row' style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>오픈소스커뮤니티 생성 및 활성도</label>
                <select
                    className='form-control'
                    name="LQOpenSourceActivity"
                    value={studentLQData.LQOpenSourceActivity}
                    onChange={handleSelectChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="">(기준)</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
            <div className='form-group form-group-row' style={{ whiteSpace: "nowrap", gap: "50%" }}>
                <label>커미터로서의 활동</label>
                <select
                    className='form-control'
                    name="LQCommitterActivity"
                    value={studentLQData.LQCommitterActivity}
                    onChange={handleSelectChange}
                    disabled={!editable}
                    style={inputStyle}
                >
                    <option value="">(기준)</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
        </div>
    );
}