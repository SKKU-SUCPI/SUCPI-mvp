import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // CSS 파일 임포트

// asset
import background from '../../assets/background.png'
import logo from '../../assets/sw-sucpi.png'

export function Header() {

    return (
        <header>
            <nav className="header bg-body-tertiary">
                <div className="container">
                    <Link className="header-brand" to="/">
                        <img src={logo} alt="성균관대학교 SW중심대학사업단" width="355" height="86" />
                    </Link>
                    
                    {/* 로그인 관련 수정 필요. -> 현재는 로그인이 되어있다고 가정하고 개발 중 */}
                    <div className='nav-buttons'>
                        <Link to='/profile' className='login-button'>내정보</Link>
                        <Link to='/admin/leaderboard' className='login-button'>관리자</Link>
                    </div>
                </div>
            </nav>
            <div className="background-image">
                <img src={background} alt="성균관대학교 SW중심대학사업단 SUCPI" />
            </div>
        </header>
    );
}