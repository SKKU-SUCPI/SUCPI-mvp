import React, { useEffect } from "react";

export function AdminLQInfo({ lqInfo }) {
    useEffect(() => {
        console.log("LQ Info:", lqInfo);
    }, [lqInfo]);

    if (!lqInfo) {
        return <div>교과활동 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div>
            <h2>교과활동 정보</h2>
            <div className='form-group'>
                <label>교육 활동 1:</label>
                <p>{lqInfo.lqEduActivity1}</p>
            </div>
            <div className='form-group'>
                <label>교육 활동 2:</label>
                <p>{lqInfo.lqEduActivity2}</p>
            </div>
            {/* 추가적인 lqInfo 필드들도 여기에 표시할 수 있습니다 */}
        </div>
    );
}
