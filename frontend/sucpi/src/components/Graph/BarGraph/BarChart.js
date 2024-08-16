import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

// 데이터 매핑
const mapDataToKorean = (data) => {
    const mapping = {
        // LQ
        openSourceActivityStar0: "LQ - 오픈소스 활동: 0점",
        openSourceActivityStar3: "LQ - 오픈소스 활동: 3점",
        openSourceActivityStar4: "LQ - 오픈소스 활동: 4점",
        openSourceActivityStar5: "LQ - 오픈소스 활동: 5점",
        activityTA: "LQ - TA 활동",
        activityEdu: "LQ - 교내외의 교육 활동",
        grade00TO30: "LQ - 학점 2.99이하",
        grade30TO35: "LQ - 학점 3.0이상 3.49이하",
        grade35TO40: "LQ - 학점 3.5이상 3.99이하",
        grade40TO45: "LQ - 학점 4.0이상 4.5이하",
        committerStar0: "LQ - 커미터 활동: 0점",
        committerStar3: "LQ - 커미터 활동: 3점",
        committerStar4: "LQ - 커미터 활동: 4점",
        committerStar5: "LQ - 커미터 활동: 5점",

        // RQ
        yulJcr5Main: "RQ - JCR 상위 5%이내 학술지(주저)",
        yulJcr5Part: "RQ - JCR 상위 5%이내 학술지(공저)",
        yulJcr10Main: "RQ - JCR 상위 10%이내 학술지(주저)",
        yulJcr10Part: "RQ - JCR 상위 10%이내 학술지(공저)",
        yulJcr20Main: "RQ - JCR 상위 20%이내 학술지(주저)",
        yulJcr20Part: "RQ - JCR 상위 20%이내 학술지(공저)",
        yulKnownSpeech: "RQ - 과학기술계 - 저명 국제학술대회 발표",
        yulKnownPoster: "RQ - 과학기술계 - 저명 국제학술대회 포스터 발표",
        yulNormalSpeech: "RQ - 과학기술계 - 일반 국제학술대회 발표",
        yulNormalPoster: "RQ - 과학기술계 - 일반 국제학술대회 포스터 발표",
        yulNationalSpeech: "RQ - 과학기술계 - 국내 학술대회 발표",
        yulNationalPoster: "RQ - 과학기술계 - 국내 학술대회 포스터 발표",
        yulTopBigCompetition: "RQ - 과학기술계 - 국제/대규모 공모전 대상",
        yulWinBigCompetition: "RQ - 과학기술계 - 국제/대규모 공모전 입상",
        yulPlayBigCompetition: "RQ - 과학기술계 - 국제/대규모 공모전 참여",
        yulTopSchoolCompetition: "RQ - 과학기술계 - 교내/지역 공모전 대상",
        yulWinSchoolCompetition: "RQ - 과학기술계 - 교내/지역 공모전 입상",
        yulPlaySchoolCompetition: "RQ - 과학기술계 - 교내/지역 공모전 참여",
        myeongOverKci: "RQ - 인문사회계 - KCI 우수등재 학술지",
        myeongKciExcellent: "RQ - 인문사회계 - KCI 등재",
        myeongKci: "RQ - 인문사회계 - KCI 후보, 기타국제",
        myeongKciCandidate: "RQ - 인문사회계 - KCI 후보, 기타국제",
        myeongKnownSpeech: "RQ - 인문사회계 - 저명 국제학술대회 발표",
        myeongNormalSpeech: "RQ - 인문사회계 - 일반 국제학술대회 발표",
        myeongNationalSpeech: "RQ - 인문사회계 - 국내 학술대회 발표",
        myeongTopBigCompetition: "RQ - 인문사회계 - 국제/대규모 공모전 대상",
        myeongWinBigCompetition: "RQ - 인문사회계 - 국제/대규모 공모전 입상",
        myeongPlayBigCompetition: "RQ - 인문사회계 - 국제/대규모 공모전 참여",
        myeongTopSchoolCompetition: "RQ - 인문사회계 - 교내/지역 공모전 대상",
        myeongWinSchoolCompetition: "RQ - 인문사회계 - 교내/지역 공모전 입상",
        myeongPlaySchoolCompetition: "RQ - 인문사회계 - 교내/지역 공모전 참여",

        // CQ
        coop: "CQ - 산학 협력 프로젝트",
        internship: "CQ - 인턴십",
        startup: "CQ - 창업",
        overseaVolunteer: "CQ - 해외 봉사",
        seminar: "CQ - 세미나 참여",
        alimi_leader: "CQ - 알리미 회장",
        alimi_vice_leader: "CQ - 알리미 부회장",
        alimi_participate: "CQ - 알리미 참여",
        council_leader: "CQ - 학생회 회장",
        council_vice_leader: "CQ - 학생회 부회장",
        council_participate: "CQ - 학생회 참여",
        reporter_leader: "CQ - 기자단 회장",
        reporter_vice_leader: "CQ - 기자단 부회장",
        reporter_participate: "CQ - 기자단 참여",
        studioContribution: "CQ - 스튜디오 기여",
        studyGroup_leader: "CQ - 스터디 그룹 회장",
        studyGroup_vice_leader: "CQ - 스터디 그룹 부회장",
        studyGroup_participate: "CQ - 스터디 그룹 참여",
    };

    const mappedData = data.map(item => ({
        ...item,
        index: mapping[item.index] || item.index // 영어 값을 한글로 매핑
    }));

    // console.log("Mapped Data:", mappedData); // 매핑된 데이터 출력

    return mappedData;
};

export function BarChart({ data }) {
    const mappedData = mapDataToKorean(data);

    // 매핑된 데이터를 확인
    console.log("Final Data for Chart:", mappedData);

    return (
        <div style={{ height: '500px' }}>
            <ResponsiveBar
                data={mappedData}
                keys={['value']}
                indexBy="index"
                margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '항목',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '건 수',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                theme={{
                    axis: {
                        ticks: {
                            line: {
                                stroke: '#4caf50', // 축의 눈금선 색상
                            },
                            text: {
                                fill: '#000000', // 축의 텍스트 색상
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: '#e0e0e0', // 그리드 선 색상
                            strokeDasharray: '6 6',
                        },
                    },
                }}
                colors={['#8DC63F']} // 더 진한 초록색으로 설정
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                tooltip={({ indexValue, value }) => (
                    <div
                        style={{
                            padding: '12px 16px',
                            background: '#ffffff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            textAlign: 'center'
                        }}
                    >
                        <strong>{indexValue}</strong>
                        <br />
                        {value}건
                    </div>
                )}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
}
