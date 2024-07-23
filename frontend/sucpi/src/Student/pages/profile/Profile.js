import React from "react";
import { AccordionItem } from "./AccordionItem";
import { PersonalInfo } from "./PersonalInfo";
import { LQInfo } from "./LQInfo";
import { RQInfo } from "./RQInfo";
import { CQInfo } from "./CQInfo";



export function Profile()
{
    return (
        <div className="profile" style={{backgroundColor: '#F0F0F0', marginRight: '30%'}}>
            <h1>내 정보</h1>
            <AccordionItem title="개인정보">
                <PersonalInfo />
            </AccordionItem>
            <AccordionItem title="교과활동">
                <LQInfo />
            </AccordionItem>
            <AccordionItem title="교과활동">
                <RQInfo />
            </AccordionItem>
            <AccordionItem title="교과활동">
                <CQInfo />
            </AccordionItem>
        </div>        
    );
}