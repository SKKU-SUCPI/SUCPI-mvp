import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // CSS 파일 임포트

// export function Sidebar()
// {
//     return (
//         <nav className="sidebar">
//             <ul className="menu">
//                 <li><Link to="/global-challenge">글로벌 챌린지</Link></li>
//                 <li><Link to="/ict-volunteer">ICT 해외봉사</Link></li>
//                 <li><Link to="/korea-challenge">코리아 챌린지</Link></li>
//             </ul>
//         </nav>
//     );
// }




export function Sidebar({ sidebarTop }) {
    return (
        <nav className="sidebar" style={{ top: `${sidebarTop}px` }}>
            <ul className="menu">
                <li><Link to="/global-challenge">글로벌 챌린지</Link></li>
                <li><Link to="/ict-volunteer">ICT 해외봉사</Link></li>
                <li><Link to="/korea-challenge">코리아 챌린지</Link></li>
            </ul>
        </nav>
    );
}