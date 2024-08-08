import '../../Student/profile/AccordionItem'

export function AdminRQInfo({ rqInfo })
{
    return (
        <div className="form-container">
            <div className="form-group form-group-column">
                <div className="label-and-button">
                    <label>학술지 논문 게재</label>
                </div>
            </div>
        </div>
    );
}

const rqInfo = {
    "studentId": "2019311378",
    "campus" : "yul",
    "yul_paper": {
        "yulJcr5Main": [],
        "yulJcr5Part": [],
        "yulJcr10Main": [],
        "yulJcr10Part": [],
        "yulJcr20Main": [],
        "yulJcr20Part": [
            "yulJcr20Part해 해당하는 논문제목 or 학술대회 or 공모전/ICPC no.0"
        ]
    },

    "myeong_paper": {
        "myeongOverKci": [],
        "myeongKciExcellent": [],
        "myeongKci": [],
        "myeongKciCandidate": []
    },

    "yul_researchContest": {
        "yulKnownSpeech": [],
        "yulKnownPoster": [],
        "yulNormalSpeech": [
            "yulNormalSpeech해 해당하는 논문제목 or 학술대회 or 공모전/ICPC no.0",
            "yulNormalSpeech해 해당하는 논문제목 or 학술대회 or 공모전/ICPC no.1",
            "yulNormalSpeech해 해당하는 논문제목 or 학술대회 or 공모전/ICPC no.2"
        ],
        "yulNormalPoster": [],
        "yulNationalSpeech": [],
        "yulNationalPoster": [],

    },

    "myeong_researchContest": {
        "myeongKnownSpeech": [],
        "myeongNormalSpeech": [],
        "myeongNationalSpeech": []
    },

    "yul_competition": {
        "yulTopBigCompetition": [],
        "yulWinBigCompetition": [],
        "yulPlayBigCompetition": [],
        "yulTopSchoolCompetition": [],
        "yulWinSchoolCompetition": [],
        "yulPlaySchoolCompetition": []
    },

    "myeong_competition": {
        "myeongTopBigCompetition": [],
        "myeongWinBigCompetition": [],
        "myeongPlayBigCompetition": [],
        "myeongTopSchoolCompetition": [],
        "myeongWinSchoolCompetition": [],
        "myeongPlaySchoolCompetition": []
    }
}