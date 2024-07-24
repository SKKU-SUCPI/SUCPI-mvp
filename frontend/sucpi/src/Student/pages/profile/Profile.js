import React from "react";
import { AccordionItem } from "./AccordionItem";
import { PersonalInfo } from "./PersonalInfo";
import { LQInfo } from "./LQInfo";
import { RQInfo } from "./RQInfo";
import { CQInfo } from "./CQInfo";
import './Profile.css'
import menuImage from '../../../assets/menu.png'



export function RightMenu() {
    return (
        <div className="right-menu">
            <div className="right-menu-header">
                <img src={menuImage} alt="SUCPI Logo" className="circle-logo-image" />
            </div>
            <div className="right-menu-body">
                <button className="right-menu-button add-button">추가하기</button>
                <button className="right-menu-button edit-button">수정하기</button>
            </div>
        </div>
    );
}

export function Profile()
{
    return (
        <div className="profile-container">
            <div className="profile" style={{ backgroundColor: '#F0F0F0', marginRight: '30%' }}>
                <h1>내 정보</h1>
                <AccordionItem title="개인정보">
                    <PersonalInfo />
                </AccordionItem>
                <AccordionItem title="교과활동">
                    <LQInfo />
                </AccordionItem>
                <AccordionItem title="연구활동">
                    <RQInfo />
                </AccordionItem>
                <AccordionItem title="비교과활동">
                    <CQInfo />
                </AccordionItem>
            </div>
            <RightMenu />
        </div>
    );
}