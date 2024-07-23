import './AccordionItem'

export function LQInfo()
{
    return (
        <div className='form-container'>
            <div className='form-group form-group-row'>
                <label>학점</label>
                <select className='form-control'>
                    <option>성적 입력</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교내ㆍ외 교육 활동</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <textarea className='form-control textarea-expanded' rows="2"></textarea>
            </div>
            <div className='form-group form-group-column'>
                <div className="label-and-button">
                    <label>교육 조교 활동</label>
                    <button className='add-item'>항목 추가</button>
                </div>
                <textarea className='form-control textarea-expanded' rows="2"></textarea>
            </div>
            <div className='form-group form-group-row' style={{whiteSpace: "nowrap", gap: "30%"}}>
                <label>오픈소스커뮤니티 생성 및 활성도</label>
                <select className='form-control'>
                    <option>(기준)</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
            <div className='form-group form-group-row' style={{whiteSpace: "nowrap", gap: "30%"}}>
                <label>커미터로서의 활동</label>
                <select className='form-control'>
                    <option>(기준)</option>
                    <option value="4To4.5">4.0~4.5</option>
                    <option value="3.5To3.99">3.5~3.99</option>
                    <option value="3.0To3.49">3.0~3.49</option>
                    <option value="~2.99">~2.99</option>
                </select>
            </div>
        </div>
    );
}