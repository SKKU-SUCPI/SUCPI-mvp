import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AccordionItem } from "../../Student/profile/AccordionItem";
import '../../Student/profile/Profile.css'
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
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/students/${id}`);
                if (!response.ok) {
                    throw new Error('학생 정보를 가져오는 데 실패했습니다.');
                }
                const data = await response.json();
                setStudentData(data.result); // `result` 객체를 설정
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
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

    const { student, lqStudent, rqStudent, cqStudent, lrcContents } = studentData;

    return (
        <div className='profile-container'>
            <div className='profile' style={{ backgroundColor: '#F0F0F0', marginRight: '30%' }}>
                <h1>학생 상세 정보</h1>
                <AccordionItem title="개인정보">
                    <AdminPersonal studentInfo={studentData.studentInfo}/>
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
                <h1 style={{paddingTop: "60px", marginBottom: '44px'}}>비교 하기</h1>
                <CompareGraph studentId={id} />
            </div>
        </div>
    );
}
