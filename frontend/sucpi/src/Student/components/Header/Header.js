import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // CSS 파일 임포트

export function Header()
{
    return (
        <header>
            <nav className="header bg-body-tertiary">
                <div className="container">
                    <Link className="header-brand" to="/">
                        <img src="/sw-sucpi.png" alt="성균관대학교 SW중심대학사업단" width="355" height="86" />
                    </Link>
                    <Link to="/login" className="login-button">로그인</Link>
                </div>
            </nav>
            <div className="background-image">
                <img src="/background.png" alt="성균관대학교 SW중심대학사업단 SUCPI" />
            </div>
        </header>
    );
}