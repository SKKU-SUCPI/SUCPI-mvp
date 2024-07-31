// Rank.jsx
import React, { useState } from 'react';
import './Rank.css';

export function Rank({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = data.filter(item => 
        item.name.includes(searchTerm) || 
        item.id.includes(searchTerm) ||
        item.department.includes(searchTerm)
    );

    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
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
                        <th>순위</th>
                        <th>이름/학번</th>
                        <th>학년</th>
                        <th>학과</th>
                        <th>SUCPI</th>
                        <th>LQ</th>
                        <th>CQ</th>
                        <th>RQ</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.name}/{item.id}</td>
                            <td>{item.grade}</td>
                            <td>{item.department}</td>
                            <td>{item.sucpi}</td>
                            <td>{item.lq}</td>
                            <td>{item.cq}</td>
                            <td>{item.rq}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(1)}>&laquo;</button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        className={currentPage === index + 1 ? 'active' : ''} 
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
            </div>
        </div>
    );
}
