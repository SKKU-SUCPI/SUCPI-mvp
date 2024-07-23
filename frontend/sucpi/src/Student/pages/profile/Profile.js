import React from "react";
import { AccordionItem } from "./AccordionItem";
import { PersonalInfo } from "./PersonalInfo";


export function Profile()
{
    return (
        <div className="profile" style={{backgroundColor: 'red', marginRight: '30%'}}>
            <h1>내 정보</h1>
            <AccordionItem title="개인정보">
                <PersonalInfo />
            </AccordionItem>
            <AccordionItem title="교과활동">
                <h1>
                    개인 정보
                </h1>
            </AccordionItem>
        </div>        
    );
}