import React from 'react';
import { useLocation } from 'react-router-dom';

export function StudentDetail() {
    const location = useLocation();
    const student = location.state?.student;

    if (!student) {
        return <div>학생 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <h1>{student.studentName} ({student.studentId})</h1>
            <p>학년: {student.studentGrade}</p>
            <p>학과: {student.studentMajor}</p>
            <p>Total: {student.totalScore}</p>
            <p>LQ: {student.lqScore}</p>
            <p>CQ: {student.cqScore}</p>
            <p>RQ: {student.rqScore}</p>
        </div>
    );
}
