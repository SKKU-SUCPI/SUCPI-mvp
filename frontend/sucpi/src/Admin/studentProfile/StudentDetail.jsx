import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStudentData } from '../../api'; // API 호출 함수 가져오기
import { AccordionItem } from "../../Student/profile/AccordionItem";
import '../../Student/profile/Profile.css';
import { AdminPersonal } from './AdminPersonal';
import { AdminLQInfo } from './AdminLQInfo';
import { AdminRQInfo } from './AdminRQInfo';
import { AdminCQInfo } from './AdminCQInfo';
import { CompareGraph } from './compareGraph/CompareGraph';

export function StudentDetail() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStudentData = async () => {
            try {
                setLoading(true); // 로딩 시작
                const data = await fetchStudentData(id); // API 호출
                setStudentData(data); // 가져온 데이터 설정
            } catch (error) {
                setError(error.message); // 에러 메시지 저장
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        loadStudentData();
    }, [id]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 발생: {error}</div>;
    }

    if (!studentData) {
        return <div>학생 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className='profile-container'>
            <div className='profile' style={{ backgroundColor: '#F0F0F0', marginRight: '30%' }}>
                <h1>학생 상세 정보</h1>
                <AccordionItem title="개인정보">
                    <AdminPersonal studentInfo={studentData.studentInfo} />
                </AccordionItem>
                <AccordionItem title="교과활동">
                    <AdminLQInfo lqInfo={studentData.lqInfo} />
                </AccordionItem>
                <AccordionItem title="연구활동">
                    <AdminRQInfo rqInfo={studentData.rqInfo} />
                </AccordionItem>
                <AccordionItem title="비교과활동">
                    <AdminCQInfo cqInfo={studentData.cqInfo} />
                </AccordionItem>
                <hr className='divider' />
                <h1 style={{ paddingTop: "60px", marginBottom: '44px' }}>비교 하기</h1>
                <CompareGraph studentId={id} />
            </div>
        </div>
    );
}
