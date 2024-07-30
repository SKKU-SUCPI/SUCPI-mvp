import React, { useState } from 'react';
import { QSetting } from './QSetting';
import { DetailSetting } from './DetailSetting';
import { CompareGraph } from './CompareGraph';

export function Setting() {
    const [ratios, setRatios] = useState(threeQData.result[0]);

    return (
        <div>
            <h1 style={{padding:"16px 36px 12px"}}>설정</h1>
            <QSetting initialRatios={ratios} setRatios={setRatios} />
            <DetailSetting data={data.result} />
            <CompareGraph ratios={ratios} />
        </div>
    );
}

const data = {
    "status": 200,
    "message": "All weights retrieved successfully",
    "result": {
        "lqweights": [
            {
                "id": 1,
                "category": "교육활동",
                "dataname": "lq_edu_activity1",
                "name": "교내외 교육활동",
                "weight": 2.0
            },
            {
                "id": 2,
                "category": "교육활동",
                "dataname": "lq_edu_activity2",
                "name": "교육조교 활동",
                "weight": 3.0
            },
            {
                "id": 3,
                "category": "교육 성취도",
                "dataname": "lq_grade_4_0_to_4_5",
                "name": "학점 4.0이상 4.5이하",
                "weight": 4.0
            },
            {
                "id": 4,
                "category": "교육 성취도",
                "dataname": "lq_grade_3_5_to_4_0",
                "name": "학점 3.5이상 3.99이하",
                "weight": 3.0
            },
            {
                "id": 5,
                "category": "교육 성취도",
                "dataname": "lq_grade_3_0_to_3_5",
                "name": "학점 3.0이상 3.49이하",
                "weight": 2.0
            },
            {
                "id": 6,
                "category": "교육 성취도",
                "dataname": "lq_grade_3_0_to_3_5",
                "name": "학점 2.99이하",
                "weight": 0.0
            },
            {
                "id": 7,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity1Star1",
                "name": "OS커뮤니티 생성 및 활성도:스타점수0",
                "weight": 0.0
            },
            {
                "id": 8,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity1Star2",
                "name": "OS커뮤니티 생성 및 활성도:스타점수3",
                "weight": 3.0
            },
            {
                "id": 9,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity1Star3",
                "name": "OS커뮤니티 생성 및 활성도:스타점수4",
                "weight": 4.0
            },
            {
                "id": 10,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity1Star4",
                "name": "OS커뮤니티 생성 및 활성도:스타점수5",
                "weight": 5.0
            },
            {
                "id": 11,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity2Star1",
                "name": "커미터로서의 활동:스타점수0",
                "weight": 0.0
            },
            {
                "id": 12,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity2Star2",
                "name": "커미터로서의 활동:스타점수3",
                "weight": 3.0
            },
            {
                "id": 13,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity2Star3",
                "name": "커미터로서의 활동:스타점수4",
                "weight": 4.0
            },
            {
                "id": 14,
                "category": "오픈소스 SW활동",
                "dataname": "lq_open_source_activity2Star4",
                "name": "커미터로서의 활동:스타점수5",
                "weight": 5.0
            }
        ],
        "rqweights": [
            {
                "id": 1,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_5_main",
                "name": "과학기술 - JCR 5%이내 주저",
                "weight": 5.0
            },
            {
                "id": 2,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_5_part",
                "name": "과학기술 - JCR 5% 이내 공저",
                "weight": 4.0
            },
            {
                "id": 3,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_10_main",
                "name": "과학기술 - JCR 10%이내 주저",
                "weight": 4.0
            },
            {
                "id": 4,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_10_part",
                "name": "과학기술 - JCR 10% 이내 공저",
                "weight": 3.0
            },
            {
                "id": 5,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_20_main",
                "name": "과학기술 - JCR 20%이내 주저",
                "weight": 3.0
            },
            {
                "id": 6,
                "category": "학술지 논문 게재",
                "dataname": "rq_yul_jcr_20_part",
                "name": "과학기술 - JCR 20% 이내 공저",
                "weight": 2.0
            },
            {
                "id": 7,
                "category": "학술대회 발표",
                "dataname": "rq_yul_known_speech",
                "name": "과학기술 - 저명 국제학술 발표 - 구두",
                "weight": 4.0
            },
            {
                "id": 8,
                "category": "학술대회 발표",
                "dataname": "rq_yul_known_poster",
                "name": "과학기술 - 저명 국제학술 발표 - 포스터",
                "weight": 3.0
            },
            {
                "id": 9,
                "category": "학술대회 발표",
                "dataname": "rq_yul_normal_speech",
                "name": "과학기술 - 일반 국제학술 발표 - 구두",
                "weight": 3.0
            },
            {
                "id": 10,
                "category": "학술대회 발표",
                "dataname": "rq_yul_normal_poster",
                "name": "과학기술 - 일반 국제학술 발표 - 포스터",
                "weight": 2.0
            },
            {
                "id": 11,
                "category": "학술대회 발표",
                "dataname": "rq_yul_national_speech",
                "name": "과학기술 - 국내 학술 대회 발표 - 구두",
                "weight": 2.0
            },
            {
                "id": 12,
                "category": "학술대회 발표",
                "dataname": "rq_yul_national_poster",
                "name": "과학기술 - 국내 학술 대회 발표 - 포스터",
                "weight": 1.0
            },
            {
                "id": 13,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_win_big_competition",
                "name": "과학기술 - 국제/대규모 공모전 대상",
                "weight": 10.0
            },
            {
                "id": 14,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_win_big_competition",
                "name": "과학기술 - 국제/대규모 공모전 입상",
                "weight": 4.0
            },
            {
                "id": 15,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_play_big_competition",
                "name": "과학기술 - 국제/대규모 공모전 참여",
                "weight": 2.0
            },
            {
                "id": 16,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_win_school_competition",
                "name": "과학기술 - 교내/지역 공모전 대상",
                "weight": 3.0
            },
            {
                "id": 17,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_play_school_competition",
                "name": "과학기술 - 교내/지역 공모전 입상",
                "weight": 1.0
            },
            {
                "id": 18,
                "category": "공모전 / ICPC",
                "dataname": "rq_yul_play_school_competition",
                "name": "과학기술 - 교내/지역 공모전 참여",
                "weight": 0.5
            },
            {
                "id": 19,
                "category": "학술지 논문 게재",
                "dataname": "rq_myeong_over_kci",
                "name": "인문사회 - SCI, SSCI, A&HCI 급 학술지",
                "weight": 5.0
            },
            {
                "id": 20,
                "category": "학술지 논문 게재",
                "dataname": "rq_myeong_kci_excellent",
                "name": "인문사회 - KCI 우수등재",
                "weight": 4.0
            },
            {
                "id": 21,
                "category": "학술지 논문 게재",
                "dataname": "rq_myeong_kci",
                "name": "인문사회 - KCI 등재",
                "weight": 3.0
            },
            {
                "id": 22,
                "category": "학술지 논문 게재",
                "dataname": "rq_myeong_kci_candidate",
                "name": "인문사회 - KCI 후보, 기타 국제",
                "weight": 2.0
            },
            {
                "id": 23,
                "category": "학술대회 발표",
                "dataname": "rq_myeong_known_speech",
                "name": "인문사회 - 저명 국제학술 대회 발표",
                "weight": 4.0
            },
            {
                "id": 24,
                "category": "학술대회 발표",
                "dataname": "rq_myeong_normal_speech",
                "name": "인문사회 - 일반 국제학술 대회 발표",
                "weight": 3.0
            },
            {
                "id": 25,
                "category": "학술대회 발표",
                "dataname": "rq_myeong_national_speech",
                "name": "인문사회 - 국내학술대회 발표",
                "weight": 2.0
            },
            {
                "id": 26,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_big_competition",
                "name": "인문사회 - 국제/대규모 공모전 대상",
                "weight": 10.0
            },
            {
                "id": 27,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_big_competition",
                "name": "인문사회 - 국제/대규모 공모전 입상",
                "weight": 4.0
            },
            {
                "id": 28,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_big_competition",
                "name": "인문사회 - 국제/대규모 공모전 참여",
                "weight": 2.0
            },
            {
                "id": 29,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_school_competition",
                "name": "인문사회 - 교내/지역 공모전 대상",
                "weight": 3.0
            },
            {
                "id": 30,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_school_competition",
                "name": "인문사회 - 교내/지역 공모전 입상",
                "weight": 1.0
            },
            {
                "id": 31,
                "category": "공모전 / ICPC",
                "dataname": "rq_myeong_school_competition",
                "name": "인문사회 - 교내/지역 공모전 참여",
                "weight": 0.5
            }
        ],
        "cqweights": [
            {
                "id": 1,
                "category": "산학프로젝트",
                "dataname": "cq_coop",
                "name": "산학프로젝트",
                "weight": 10.0
            },
            {
                "id": 2,
                "category": "인턴십",
                "dataname": "cq_internship",
                "name": "인턴십",
                "weight": 10.0
            },
            {
                "id": 3,
                "category": "창업",
                "dataname": "cq_startup",
                "name": "창업",
                "weight": 30.0
            },
            {
                "id": 4,
                "category": "해외봉사",
                "dataname": "cq_oversea_volunteer",
                "name": "해외봉사",
                "weight": 10.0
            },
            {
                "id": 5,
                "category": "화상강연 / 세미나 참여",
                "dataname": "cq_lecture_seminar",
                "name": "화상강연 / 세미나",
                "weight": 1.0
            },
            {
                "id": 6,
                "category": "알리미",
                "dataname": "cq_alimi",
                "name": "알리미 - 회장",
                "weight": 5.0
            },
            {
                "id": 7,
                "category": "알리미",
                "dataname": "cq_alimi",
                "name": "알리미 - 부회장",
                "weight": 3.0
            },
            {
                "id": 8,
                "category": "알리미",
                "dataname": "cq_alimi",
                "name": "알리미 - 참여",
                "weight": 2.0
            },
            {
                "id": 9,
                "category": "학생회",
                "dataname": "cq_student_council",
                "name": "학생회 - 회장",
                "weight": 5.0
            },
            {
                "id": 10,
                "category": "학생회",
                "dataname": "cq_student_council",
                "name": "학생회 - 부회장",
                "weight": 3.0
            },
            {
                "id": 11,
                "category": "학생회",
                "dataname": "cq_student_council",
                "name": "학생회 - 참여",
                "weight": 2.0
            },
            {
                "id": 12,
                "category": "미디어홍보",
                "dataname": "cq_media_promotion",
                "name": "기자단 - 회장",
                "weight": 5.0
            },
            {
                "id": 13,
                "category": "미디어홍보",
                "dataname": "cq_media_promotion",
                "name": "기자단 - 부회장",
                "weight": 3.0
            },
            {
                "id": 14,
                "category": "미디어홍보",
                "dataname": "cq_media_promotion",
                "name": "기자단 - 참여",
                "weight": 2.0
            },
            {
                "id": 15,
                "category": "스튜디오기여",
                "dataname": "cq_studio_contribution",
                "name": "ARS Electronica 작품 제공",
                "weight": 2.0
            },
            {
                "id": 16,
                "category": "스터디 그룹",
                "dataname": "cq_study_group",
                "name": "SCG, MAV 스꾸딩 등 - 회장",
                "weight": 5.0
            },
            {
                "id": 17,
                "category": "스터디 그룹",
                "dataname": "cq_study_group",
                "name": "SCG, MAV 스꾸딩 등 - 부회장",
                "weight": 3.0
            },
            {
                "id": 18,
                "category": "스터디 그룹",
                "dataname": "cq_study_group",
                "name": "SCG, MAV 스꾸딩 등 - 참여",
                "weight": 2.0
            },
        ]
    }
}

const threeQData = {
    "status": 200,
    "message": "All LRCq ratio retrieved successfully",
    "result": [
        {
            "id": 1,
            "lqRatio": 33.3,
            "rqRatio": 33.3,
            "cqRatio": 33.3
        }
    ]
}