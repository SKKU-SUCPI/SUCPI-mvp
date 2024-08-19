import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rank.css';

export function Rank({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesPerGroup = 10; // 한 번에 표시할 페이지 버튼 수
    const navigate = useNavigate();

    const filteredData = data.filter(item => 
        item.studentName.includes(searchTerm) || 
        item.studentId.includes(searchTerm) ||
        item.studentMajor.includes(searchTerm)
    );

    const departmentMapping = {
        'SW': '소프트웨어학과',
        'GC': '글로벌융합학부',
        'AI': '지능형소프트웨어학과',
    };

    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowClick = (studentId) => {
        navigate(`/admin/students/${studentId}`);
    };

    return (
        <div className="rank-container">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="이름 또는 학번 검색" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{width: "160px"}}
                />
            </div>
            <table className="rank-table">
                <thead>
                    <tr>
                        <th>전체 순위</th>
                        <th>이름/학번</th>
                        <th>학년</th>
                        <th>학과</th>
                        <th>Total</th>
                        <th>LQ</th>
                        <th>CQ</th>
                        <th>RQ</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(item.studentId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{item.rank}</td>
                            <td>{item.studentName}/{item.studentId}</td>
                            <td>{item.studentGrade}</td>
                            <td>{departmentMapping[item.studentMajor]}</td> {/* 학과 이름 변환 */}
                            <td>{item.totalScore}</td>
                            <td>{item.lqScore}</td>
                            <td>{item.cqScore}</td>
                            <td>{item.rqScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&laquo;</button>
                <button 
                    onClick={() => handlePageChange(startPage - 1)} 
                    disabled={startPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button 
                        key={index + startPage} 
                        className={currentPage === index + startPage ? 'active' : ''} 
                        onClick={() => handlePageChange(index + startPage)}
                    >
                        {index + startPage}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(endPage + 1)} 
                    disabled={endPage === totalPages}
                >
                    &gt;
                </button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
            </div>
        </div>
    );
}
