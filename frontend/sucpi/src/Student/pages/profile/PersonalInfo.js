import './AccordionItem'

export function PersonalInfo()
{
    return (
        <>
            <div className='form-group'>
                <label>이름</label>
                <input type='text' className='form-control' />
            </div>
            <div className='form-group'>
                <label>학번</label>
                <input type='text' className='form-control' />
            </div>
            <div className='form-group'>
                <label>소속 학과</label>
                <select className='form-control'>
                    <option>학과를 선택해 주세요</option>
                    <option value="소프트웨어학과">소프트웨어학과</option>
                    <option value="글로벌융합학부">글로벌융합학부</option>
                    <option value="지능형 소프트웨어학과">지능형 소프트웨어학과</option>
                </select>
            </div>
            <div className='form-group'>
                <label>연락처</label>
                <input type='text' className='form-control-contact' /> - <input type='text' className='form-control' /> - <input type='text' className='form-control' />
            </div>
        </>
    );
}