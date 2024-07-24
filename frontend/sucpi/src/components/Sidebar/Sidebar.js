// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // CSS 파일 임포트
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

export function Sidebar({ toggleSidebar, isOpen }) {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? <IoIosArrowDropleft className="toggle-icon" /> : <IoIosArrowDropright className="toggle-icon" />}
            </button>
            <nav>
                <ul className="menu">
                    {isAdminPath ? (
                        <>
                            <li><Link to="/admin/leaderboard">리더보드</Link></li>
                            <li><Link to="/admin/statistic">통계</Link></li>
                            <li><Link to="/admin/setting">설정</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/global-challenge">글로벌 챌린지</Link></li>
                            <li><Link to="/ict-volunteer">ICT 해외봉사</Link></li>
                            <li><Link to="/korea-challenge">코리아 챌린지</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
