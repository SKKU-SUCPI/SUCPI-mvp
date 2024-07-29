import React, { useState } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';

export function Setting()
{
    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>설정</h1>
            <QSetting />
            <DetailSetting />
            <CompareGraph />
        </div>
    );
}