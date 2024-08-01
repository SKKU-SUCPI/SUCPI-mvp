import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AccordionItem } from "../../Student/profile/AccordionItem";
import '../../Student/profile/Profile.css'
import { AdminPersonal } from './AdminPersonal';

export function StudentDetail() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/admin/students/${id}`);
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
        // <div>
        //     <h1>{student.studentName} ({student.studentId})</h1>
        //     <p>학년: {student.studentGrade}</p>
        //     <p>학과: {student.studentMajor}</p>
        //     <p>전화번호: {student.studentPhoneNum}</p>
        //     <p>Total Score: {student.studentRqScore + student.studentLqScore + student.studentCqScore}</p>
        //     <p>LQ Score: {student.studentLqScore}</p>
        //     <p>CQ Score: {student.studentCqScore}</p>
        //     <p>RQ Score: {student.studentRqScore}</p>

        //     <h2>LQ Activities</h2>
        //     <p>Activity 1: {lqStudent.lqEduActivity1}</p>
        //     <p>Activity 2: {lqStudent.lqEduActivity2}</p>
        //     {/* 추가 LQ 활동들 표시 */}

        //     <h2>RQ Activities</h2>
        //     <p>Yul JCR 5 Main: {rqStudent.rqYulJcr5Main}</p>
        //     <p>Yul JCR 5 Part: {rqStudent.rqYulJcr5Part}</p>
        //     {/* 추가 RQ 활동들 표시 */}

        //     <h2>CQ Activities</h2>
        //     <p>Co-op: {cqStudent.cqCoop}</p>
        //     <p>Internship: {cqStudent.cqInternship}</p>
        //     {/* 추가 CQ 활동들 표시 */}

        //     <h2>Learning, Research, and Career Contents</h2>
        //     <ul>
        //         {lrcContents.map((content) => (
        //             <li key={content.id}>
        //                 <strong>{content.dataname}: </strong>{content.contents}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className='profile-container'>
            <div className='profile' style={{ backgroundColor: '#F0F0F0', marginRight: '30%' }}>
                <h1>학생 상세 정보</h1>
                <AccordionItem title="개인정보">
                    <AdminPersonal studentInfo={studentData.student}/>
                </AccordionItem>
                <AccordionItem title="교과활동">

                </AccordionItem>
                <AccordionItem title="연구활동">

                </AccordionItem>
                <AccordionItem title="비교과활동">

                </AccordionItem>
                <h1 style={{paddingTop: "60px" }}>변화 추이</h1>
            </div>
        </div>
    );
}
