import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import './AccordionItem.css'; // 필요한 경우 CSS 파일 임포트

export function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
                {isOpen ? <BiSolidDownArrow className="accordion-icon" /> : <BiSolidRightArrow className="accordion-icon" />}
                <span>{title}</span>
            </div>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
}
