package com.skku.sucpi.service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.StudentProfileDTO;
import com.skku.sucpi.dto.StudentProfileDTO.CQInfo;
import com.skku.sucpi.dto.StudentProfileDTO.LQInfo;
import com.skku.sucpi.dto.StudentProfileDTO.MyeongCompetition;
import com.skku.sucpi.dto.StudentProfileDTO.MyeongPaper;
import com.skku.sucpi.dto.StudentProfileDTO.MyeongResearchContest;
import com.skku.sucpi.dto.StudentProfileDTO.RQInfo;
import com.skku.sucpi.dto.StudentProfileDTO.StudentInfo;
import com.skku.sucpi.dto.StudentProfileDTO.YulCompetition;
import com.skku.sucpi.dto.StudentProfileDTO.YulPaper;
import com.skku.sucpi.dto.StudentProfileDTO.YulResearchContest;
import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.CQWeight;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.LQWeight;
import com.skku.sucpi.entity.LRCContent;
import com.skku.sucpi.entity.LRCRatio;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.RQWeight;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.CQStudentRepository;
import com.skku.sucpi.repository.CQWeightRepository;
import com.skku.sucpi.repository.LQStudentRepository;
import com.skku.sucpi.repository.LQWeightRepository;
import com.skku.sucpi.repository.LRCContentRepository;
import com.skku.sucpi.repository.LRCRatioRepository;
import com.skku.sucpi.repository.RQStudentRepository;
import com.skku.sucpi.repository.RQWeightRepository;
import com.skku.sucpi.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentProfileService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LQStudentRepository lqStudentRepository;
    @Autowired
    private RQStudentRepository rqStudentRepository;
    @Autowired
    private CQStudentRepository cqStudentRepository;

    @Autowired
    private LQWeightRepository lqWeightRepository;
    @Autowired
    private RQWeightRepository rqWeightRepository;
    @Autowired
    private CQWeightRepository cqWeightRepository;

    @Autowired
    private LRCContentRepository lrcContentRepository;
    @Autowired
    private LRCRatioRepository lrcRatioRepository;

    @Transactional
    public StudentProfileDTO getStudentProfileById(String studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<LQStudent> lqStudentOpt = lqStudentRepository.findById(studentId);
        Optional<RQStudent> rqStudentOpt = rqStudentRepository.findById(studentId);
        Optional<CQStudent> cqStudentOpt = cqStudentRepository.findById(studentId);
        List<LRCContent> lrcContents = lrcContentRepository.findByStudentId(studentId);

        if (studentOpt.isPresent() && lqStudentOpt.isPresent() && rqStudentOpt.isPresent() && cqStudentOpt.isPresent()) {
            Student student = studentOpt.get();

            StudentInfo studentInfo = new StudentInfo();
            studentInfo.setId(student.getStudentId());
            studentInfo.setMajor(student.getStudentMajor());
            studentInfo.setName(student.getStudentName());
            studentInfo.setPhone(student.getStudentPhoneNum());

            LQInfo lqInfo = new LQInfo();
            lqInfo.setStudentId(student.getStudentId());
            lqInfo.setActivityEdu(getContentsList(lrcContents, "activityEdu"));
            lqInfo.setActivityTA(getContentsList(lrcContents, "activityTA"));
            // 나머지 항목들은 그대로 설정
            lqInfo.setGrade40TO45(lqStudentOpt.get().getGrade40TO45());
            lqInfo.setGrade35TO40(lqStudentOpt.get().getGrade35TO40());
            lqInfo.setGrade30TO35(lqStudentOpt.get().getGrade30TO35());
            lqInfo.setGrade00TO30(lqStudentOpt.get().getGrade00TO30());
            lqInfo.setOpenSourceActivityStar0(lqStudentOpt.get().getOpenSourceActivityStar0());
            lqInfo.setOpenSourceActivityStar3(lqStudentOpt.get().getOpenSourceActivityStar3());
            lqInfo.setOpenSourceActivityStar4(lqStudentOpt.get().getOpenSourceActivityStar4());
            lqInfo.setOpenSourceActivityStar5(lqStudentOpt.get().getOpenSourceActivityStar5());
            lqInfo.setCommitterStar0(lqStudentOpt.get().getCommitterStar0());
            lqInfo.setCommitterStar3(lqStudentOpt.get().getCommitterStar3());
            lqInfo.setCommitterStar4(lqStudentOpt.get().getCommitterStar4());
            lqInfo.setCommitterStar5(lqStudentOpt.get().getCommitterStar5());

            RQInfo rqInfo = new RQInfo();
            rqInfo.setStudentId(student.getStudentId());
            // Set the campus based on the major
            String major = student.getStudentMajor().toLowerCase();
            if (major.equals("sw") || major.equals("ai")) {
                rqInfo.setCampus("yul");
            } else if (major.equals("gc")) {
                rqInfo.setCampus("myeong");
            }
            rqInfo.setYul_paper(new YulPaper(
                getContentsList(lrcContents, "yulJcr5Main"),
                getContentsList(lrcContents, "yulJcr5Part"),
                getContentsList(lrcContents, "yulJcr10Main"),
                getContentsList(lrcContents, "yulJcr10Part"),
                getContentsList(lrcContents, "yulJcr20Main"),
                getContentsList(lrcContents, "yulJcr20Part")
            ));
            rqInfo.setMyeong_paper(new MyeongPaper(
                getContentsList(lrcContents, "myeongOverKci"),
                getContentsList(lrcContents, "myeongKciExcellent"),
                getContentsList(lrcContents, "myeongKci"),
                getContentsList(lrcContents, "myeongKciCandidate")
            ));
            rqInfo.setYul_researchContest(new YulResearchContest(
                getContentsList(lrcContents, "yulKnownSpeech"),
                getContentsList(lrcContents, "yulKnownPoster"),
                getContentsList(lrcContents, "yulNormalSpeech"),
                getContentsList(lrcContents, "yulNormalPoster"),
                getContentsList(lrcContents, "yulNationalSpeech"),
                getContentsList(lrcContents, "yulNationalPoster")
            ));
            rqInfo.setMyeong_researchContest(new MyeongResearchContest(
                getContentsList(lrcContents, "myeongKnownSpeech"),
                getContentsList(lrcContents, "myeongNormalSpeech"),
                getContentsList(lrcContents, "myeongNationalSpeech")
            ));
            rqInfo.setYul_competition(new YulCompetition(
                getContentsList(lrcContents, "yulTopBigCompetition"),
                getContentsList(lrcContents, "yulWinBigCompetition"),
                getContentsList(lrcContents, "yulPlayBigCompetition"),
                getContentsList(lrcContents, "yulTopSchoolCompetition"),
                getContentsList(lrcContents, "yulWinSchoolCompetition"),
                getContentsList(lrcContents, "yulPlaySchoolCompetition")
            ));
            rqInfo.setMyeong_competition(new MyeongCompetition(
                getContentsList(lrcContents, "myeongTopBigCompetition"),
                getContentsList(lrcContents, "myeongWinBigCompetition"),
                getContentsList(lrcContents, "myeongPlayBigCompetition"),
                getContentsList(lrcContents, "myeongTopSchoolCompetition"),
                getContentsList(lrcContents, "myeongWinSchoolCompetition"),
                getContentsList(lrcContents, "myeongPlaySchoolCompetition")
            ));

            CQInfo cqInfo = new CQInfo();
            cqInfo.setStudentId(student.getStudentId());
            cqInfo.setCoop(getSingleContent(lrcContents, "coop"));
            cqInfo.setInternship(getSingleContent(lrcContents, "internship"));
            cqInfo.setStartup(getSingleContent(lrcContents, "startup"));
            cqInfo.setOverseaVolunteer(getSingleContent(lrcContents, "overseaVolunteer"));
            cqInfo.setSeminar(getContentsList(lrcContents, "seminar"));
            cqInfo.setStudioContribution(getContentsList(lrcContents, "studioContribution"));
            // 나머지 항목들은 그대로 설정
            cqInfo.setAlimi_leader(cqStudentOpt.get().getAlimi_leader());
            cqInfo.setAlimi_vice_leader(cqStudentOpt.get().getAlimi_vice_leader());
            cqInfo.setAlimi_participate(cqStudentOpt.get().getAlimi_participate());
            cqInfo.setCouncil_leader(cqStudentOpt.get().getCouncil_leader());
            cqInfo.setCouncil_vice_leader(cqStudentOpt.get().getCouncil_vice_leader());
            cqInfo.setCouncil_participate(cqStudentOpt.get().getCouncil_participate());
            cqInfo.setReporter_leader(cqStudentOpt.get().getReporter_leader());
            cqInfo.setReporter_vice_leader(cqStudentOpt.get().getReporter_vice_leader());
            cqInfo.setReporter_participate(cqStudentOpt.get().getReporter_participate());
            //cqInfo.setStudioContribution(cqStudentOpt.get().getStudioContribution());
            cqInfo.setStudyGroup_leader(cqStudentOpt.get().getStudyGroup_leader());
            cqInfo.setStudyGroup_vice_leader(cqStudentOpt.get().getStudyGroup_vice_leader());
            cqInfo.setStudyGroup_participate(cqStudentOpt.get().getStudyGroup_participate());

            return new StudentProfileDTO(
                    studentInfo,
                    lqInfo,
                    rqInfo,
                    cqInfo
            );
        }
        return null;
    }

    @Transactional
    public void saveStudentProfile(StudentProfileDTO studentProfileDTO) {
        Student student = studentRepository.findById(studentProfileDTO.getStudentInfo().getId()).orElse(new Student());
        student.setStudentId(studentProfileDTO.getStudentInfo().getId());
        student.setStudentName(studentProfileDTO.getStudentInfo().getName());
        student.setStudentMajor(studentProfileDTO.getStudentInfo().getMajor());
        student.setStudentPhoneNum(studentProfileDTO.getStudentInfo().getPhone());

        LQStudent lqStudent = new LQStudent();
        lqStudent.setStudentId(studentProfileDTO.getStudentInfo().getId());
        lqStudent.setActivityEdu(studentProfileDTO.getLqInfo().getActivityEdu().size());
        lqStudent.setActivityTA(studentProfileDTO.getLqInfo().getActivityTA().size());
        // 나머지 항목들은 그대로 설정
        lqStudent.setGrade40TO45(studentProfileDTO.getLqInfo().getGrade40TO45());
        lqStudent.setGrade35TO40(studentProfileDTO.getLqInfo().getGrade35TO40());
        lqStudent.setGrade30TO35(studentProfileDTO.getLqInfo().getGrade30TO35());
        lqStudent.setGrade00TO30(studentProfileDTO.getLqInfo().getGrade00TO30());
        lqStudent.setOpenSourceActivityStar0(studentProfileDTO.getLqInfo().getOpenSourceActivityStar0());
        lqStudent.setOpenSourceActivityStar3(studentProfileDTO.getLqInfo().getOpenSourceActivityStar3());
        lqStudent.setOpenSourceActivityStar4(studentProfileDTO.getLqInfo().getOpenSourceActivityStar4());
        lqStudent.setOpenSourceActivityStar5(studentProfileDTO.getLqInfo().getOpenSourceActivityStar5());
        lqStudent.setCommitterStar0(studentProfileDTO.getLqInfo().getCommitterStar0());
        lqStudent.setCommitterStar3(studentProfileDTO.getLqInfo().getCommitterStar3());
        lqStudent.setCommitterStar4(studentProfileDTO.getLqInfo().getCommitterStar4());
        lqStudent.setCommitterStar5(studentProfileDTO.getLqInfo().getCommitterStar5());

        RQStudent rqStudent = new RQStudent();
        rqStudent.setStudentId(studentProfileDTO.getStudentInfo().getId());
        rqStudent.setYulJcr5Main(studentProfileDTO.getRqInfo().getYul_paper().getYulJcr5Main().size());
        rqStudent.setYulJcr5Part(studentProfileDTO.getRqInfo().getYul_paper().getYulJcr5Part().size());
        rqStudent.setYulJcr10Main(studentProfileDTO.getRqInfo().getYul_paper().getYulJcr10Main().size());
        rqStudent.setYulJcr10Part(studentProfileDTO.getRqInfo().getYul_paper().getYulJcr10Part().size());
        rqStudent.setYulKnownSpeech(studentProfileDTO.getRqInfo().getYul_researchContest().getYulKnownSpeech().size());
        rqStudent.setYulKnownPoster(studentProfileDTO.getRqInfo().getYul_researchContest().getYulKnownPoster().size());
        rqStudent.setYulNormalSpeech(studentProfileDTO.getRqInfo().getYul_researchContest().getYulNormalSpeech().size());
        rqStudent.setYulNormalPoster(studentProfileDTO.getRqInfo().getYul_researchContest().getYulNormalPoster().size());
        rqStudent.setYulNationalSpeech(studentProfileDTO.getRqInfo().getYul_researchContest().getYulNationalSpeech().size());
        rqStudent.setYulNationalPoster(studentProfileDTO.getRqInfo().getYul_researchContest().getYulNationalPoster().size());
        rqStudent.setYulTopBigCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulTopBigCompetition().size());
        rqStudent.setYulWinBigCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulWinBigCompetition().size());
        rqStudent.setYulPlayBigCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulPlayBigCompetition().size());
        rqStudent.setYulTopSchoolCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulTopSchoolCompetition().size());
        rqStudent.setYulWinSchoolCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulWinSchoolCompetition().size());
        rqStudent.setYulPlaySchoolCompetition(studentProfileDTO.getRqInfo().getYul_competition().getYulPlaySchoolCompetition().size());
        rqStudent.setMyeongOverKci(studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongOverKci().size());
        rqStudent.setMyeongKciExcellent(studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKciExcellent().size());
        rqStudent.setMyeongKci(studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKci().size());
        rqStudent.setMyeongKciCandidate(studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKciCandidate().size());
        rqStudent.setMyeongKnownSpeech(studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongKnownSpeech().size());
        rqStudent.setMyeongNormalSpeech(studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongNormalSpeech().size());
        rqStudent.setMyeongNationalSpeech(studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongNationalSpeech().size());
        rqStudent.setMyeongTopBigCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongTopBigCompetition().size());
        rqStudent.setMyeongWinBigCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongWinBigCompetition().size());
        rqStudent.setMyeongPlayBigCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongPlayBigCompetition().size());
        rqStudent.setMyeongTopSchoolCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongTopSchoolCompetition().size());
        rqStudent.setMyeongWinSchoolCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongWinSchoolCompetition().size());
        rqStudent.setMyeongPlaySchoolCompetition(studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongPlaySchoolCompetition().size());

        CQStudent cqStudent = new CQStudent();
        cqStudent.setStudentId(studentProfileDTO.getStudentInfo().getId());
        cqStudent.setCoop(isBlank(studentProfileDTO.getCqInfo().getCoop()) ? 0 : 1);
        cqStudent.setInternship(isBlank(studentProfileDTO.getCqInfo().getInternship()) ? 0 : 1);
        cqStudent.setStartup(isBlank(studentProfileDTO.getCqInfo().getStartup()) ? 0 : 1);
        cqStudent.setOverseaVolunteer(isBlank(studentProfileDTO.getCqInfo().getOverseaVolunteer()) ? 0 : 1);
        cqStudent.setSeminar(studentProfileDTO.getCqInfo().getSeminar().size());
        cqStudent.setStudioContribution(studentProfileDTO.getCqInfo().getStudioContribution().size());
        // 나머지 항목들은 그대로 설정
        cqStudent.setAlimi_leader(studentProfileDTO.getCqInfo().getAlimi_leader());
        cqStudent.setAlimi_vice_leader(studentProfileDTO.getCqInfo().getAlimi_vice_leader());
        cqStudent.setAlimi_participate(studentProfileDTO.getCqInfo().getAlimi_participate());
        cqStudent.setCouncil_leader(studentProfileDTO.getCqInfo().getCouncil_leader());
        cqStudent.setCouncil_vice_leader(studentProfileDTO.getCqInfo().getCouncil_vice_leader());
        cqStudent.setCouncil_participate(studentProfileDTO.getCqInfo().getCouncil_participate());
        cqStudent.setReporter_leader(studentProfileDTO.getCqInfo().getReporter_leader());
        cqStudent.setReporter_vice_leader(studentProfileDTO.getCqInfo().getReporter_vice_leader());
        cqStudent.setReporter_participate(studentProfileDTO.getCqInfo().getReporter_participate());
        //cqStudent.setStudioContribution(studentProfileDTO.getCqInfo().getStudioContribution());
        cqStudent.setStudyGroup_leader(studentProfileDTO.getCqInfo().getStudyGroup_leader());
        cqStudent.setStudyGroup_vice_leader(studentProfileDTO.getCqInfo().getStudyGroup_vice_leader());
        cqStudent.setStudyGroup_participate(studentProfileDTO.getCqInfo().getStudyGroup_participate());

        lqStudentRepository.save(lqStudent);
        rqStudentRepository.save(rqStudent);
        cqStudentRepository.save(cqStudent);

        // 기존 LRCContent 삭제
        lrcContentRepository.deleteByStudentId(student.getStudentId());

        // 새로운 LRCContent 저장
        saveContents(student.getStudentId(), "activityEdu", studentProfileDTO.getLqInfo().getActivityEdu());
        saveContents(student.getStudentId(), "activityTA", studentProfileDTO.getLqInfo().getActivityTA());
        saveContents(student.getStudentId(), "yulJcr5Main", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr5Main());
        saveContents(student.getStudentId(), "yulJcr5Part", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr5Part());
        saveContents(student.getStudentId(), "yulJcr10Main", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr10Main());
        saveContents(student.getStudentId(), "yulJcr10Part", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr10Part());
        saveContents(student.getStudentId(), "yulJcr20Main", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr20Main());
        saveContents(student.getStudentId(), "yulJcr20Part", studentProfileDTO.getRqInfo().getYul_paper().getYulJcr20Part());
        saveContents(student.getStudentId(), "yulKnownSpeech", studentProfileDTO.getRqInfo().getYul_researchContest().getYulKnownSpeech());
        saveContents(student.getStudentId(), "yulKnownPoster", studentProfileDTO.getRqInfo().getYul_researchContest().getYulKnownPoster());
        saveContents(student.getStudentId(), "yulNormalSpeech", studentProfileDTO.getRqInfo().getYul_researchContest().getYulNormalSpeech());
        saveContents(student.getStudentId(), "yulNormalPoster", studentProfileDTO.getRqInfo().getYul_researchContest().getYulNormalPoster());
        saveContents(student.getStudentId(), "yulNationalSpeech", studentProfileDTO.getRqInfo().getYul_researchContest().getYulNationalSpeech());
        saveContents(student.getStudentId(), "yulNationalPoster", studentProfileDTO.getRqInfo().getYul_researchContest().getYulNationalPoster());
        saveContents(student.getStudentId(), "yulTopBigCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulTopBigCompetition());
        saveContents(student.getStudentId(), "yulWinBigCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulWinBigCompetition());
        saveContents(student.getStudentId(), "yulPlayBigCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulPlayBigCompetition());
        saveContents(student.getStudentId(), "yulTopSchoolCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulTopSchoolCompetition());
        saveContents(student.getStudentId(), "yulWinSchoolCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulWinSchoolCompetition());
        saveContents(student.getStudentId(), "yulPlaySchoolCompetition", studentProfileDTO.getRqInfo().getYul_competition().getYulPlaySchoolCompetition());
        saveContents(student.getStudentId(), "myeongOverKci", studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongOverKci());
        saveContents(student.getStudentId(), "myeongKciExcellent", studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKciExcellent());
        saveContents(student.getStudentId(), "myeongKci", studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKci());
        saveContents(student.getStudentId(), "myeongKciCandidate", studentProfileDTO.getRqInfo().getMyeong_paper().getMyeongKciCandidate());
        saveContents(student.getStudentId(), "myeongKnownSpeech", studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongKnownSpeech());
        saveContents(student.getStudentId(), "myeongNormalSpeech", studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongNormalSpeech());
        saveContents(student.getStudentId(), "myeongNationalSpeech", studentProfileDTO.getRqInfo().getMyeong_researchContest().getMyeongNationalSpeech());
        saveContents(student.getStudentId(), "myeongTopBigCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongTopBigCompetition());
        saveContents(student.getStudentId(), "myeongWinBigCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongWinBigCompetition());
        saveContents(student.getStudentId(), "myeongPlayBigCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongPlayBigCompetition());
        saveContents(student.getStudentId(), "myeongTopSchoolCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongTopSchoolCompetition());
        saveContents(student.getStudentId(), "myeongWinSchoolCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongWinSchoolCompetition());
        saveContents(student.getStudentId(), "myeongPlaySchoolCompetition", studentProfileDTO.getRqInfo().getMyeong_competition().getMyeongPlaySchoolCompetition());
        saveContents(student.getStudentId(), "coop", studentProfileDTO.getCqInfo().getCoop());
        saveContents(student.getStudentId(), "internship", studentProfileDTO.getCqInfo().getInternship());
        saveContents(student.getStudentId(), "startup", studentProfileDTO.getCqInfo().getStartup());
        saveContents(student.getStudentId(), "overseaVolunteer", studentProfileDTO.getCqInfo().getOverseaVolunteer());
        saveContents(student.getStudentId(), "seminar", studentProfileDTO.getCqInfo().getSeminar());
        saveContents(student.getStudentId(), "studioContribution", studentProfileDTO.getCqInfo().getStudioContribution());


        studentRepository.save(student);

        // LQ, RQ, CQ의 건수 및 점수를 업데이트
        updateStudentScores(student.getStudentId());

        updateAdjustedScores();
    }

    private List<String> getContentsList(List<LRCContent> contents, String dataname) {
        return contents.stream()
                .filter(content -> content.getDataname().equals(dataname))
                .map(LRCContent::getContents)
                .collect(Collectors.toList());
    }

    private String getSingleContent(List<LRCContent> contents, String dataname) {
        return contents.stream()
                .filter(content -> content.getDataname().equals(dataname))
                .map(LRCContent::getContents)
                .findFirst()
                .orElse("");
    }

    private void saveContents(String studentId, String dataname, List<String> contents) {
        if (contents != null) {
            for (String content : contents) {
                if (!content.trim().isEmpty()) {
                    LRCContent lrcContent = new LRCContent();
                    lrcContent.setStudentId(studentId);
                    lrcContent.setDataname(dataname);
                    lrcContent.setContents(content);
                    lrcContentRepository.save(lrcContent);
                }
            }
        }
    }

    private void saveContents(String studentId, String dataname, String content) {
        if (content != null && !content.trim().isEmpty()) {
            LRCContent lrcContent = new LRCContent();
            lrcContent.setStudentId(studentId);
            lrcContent.setDataname(dataname);
            lrcContent.setContents(content);
            lrcContentRepository.save(lrcContent);
        }
    }

    private boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    private void updateStudentScores(String studentId) {
        Optional<LQStudent> lqStudentOpt = lqStudentRepository.findById(studentId);
        Optional<RQStudent> rqStudentOpt = rqStudentRepository.findById(studentId);
        Optional<CQStudent> cqStudentOpt = cqStudentRepository.findById(studentId);
        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (lqStudentOpt.isPresent() && rqStudentOpt.isPresent() && cqStudentOpt.isPresent() && studentOpt.isPresent()) {
            LQStudent lqStudent = lqStudentOpt.get();
            RQStudent rqStudent = rqStudentOpt.get();
            CQStudent cqStudent = cqStudentOpt.get();
            Student student = studentOpt.get();

            List<LQWeight> lqWeights = lqWeightRepository.findAll();
            List<RQWeight> rqWeights = rqWeightRepository.findAll();
            List<CQWeight> cqWeights = cqWeightRepository.findAll();

            // LQ, RQ, CQ 점수 계산
            float lqScore = calculateScore(lqStudent, lqWeights, "LQ");
            float rqScore = calculateScore(rqStudent, rqWeights, "RQ");
            float cqScore = calculateScore(cqStudent, cqWeights, "CQ");

            // LQ, RQ, CQ 건수 계산
            int lqNum = calculateNum(lqStudent);
            int rqNum = calculateNum(rqStudent);
            int cqNum = calculateNum(cqStudent);

            student.setStudentLqScore(lqScore);
            student.setStudentRqScore(rqScore);
            student.setStudentCqScore(cqScore);
            student.setStudentLqNum(lqNum);
            student.setStudentRqNum(rqNum);
            student.setStudentCqNum(cqNum);

            studentRepository.save(student);
        }
    }

    private int calculateNum(Object obj) {
        return Arrays.stream(obj.getClass().getDeclaredFields())
                .filter(field -> field.getType() == int.class)
                .mapToInt(field -> {
                    try {
                        field.setAccessible(true);
                        return field.getInt(obj);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                        return 0;
                    }
                }).sum();
    }

    private float calculateScore(Object student, List<? extends Object> weights, String category) {
        float score = 0;
        for (Field field : student.getClass().getDeclaredFields()) {
            if (field.getType() == int.class) {
                field.setAccessible(true);
                try {
                    int value = field.getInt(student);
                    for (Object weight : weights) {
                        Field datanameField = weight.getClass().getDeclaredField("dataname");
                        datanameField.setAccessible(true);
                        String dataname = (String) datanameField.get(weight);
                        if (dataname.equalsIgnoreCase(field.getName())) {
                            Field weightField = weight.getClass().getDeclaredField("weight");
                            weightField.setAccessible(true);
                            float weightValue = weightField.getFloat(weight);
                            float fieldScore = value * weightValue;
                            score += fieldScore;
                            break;
                        }
                    }
                } catch (IllegalAccessException | NoSuchFieldException e) {
                    e.printStackTrace();
                }
            }
        }
        return score;
    }

    public List<Double> calculateAvg() {
        List<Double> avgQ;
        Double totalLqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentLqScore)
            .average().orElse(0.0);
        Double totalRqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentRqScore)
            .average().orElse(0.0);
        Double totalCqScore = studentRepository.findAll().stream()
            .mapToDouble(Student::getStudentCqScore)
            .average().orElse(0.0);
        avgQ = List.of(totalLqScore,totalRqScore,totalCqScore);
        return avgQ;
    }

    public List<Double> calculateStdDeviation() {
        List<Double> avgQ = calculateAvg();
        double LQ_avg = avgQ.get(0);
        double RQ_avg = avgQ.get(1);
        double CQ_avg = avgQ.get(2);

        double LQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentLqScore() - LQ_avg, 2))
            .average()
            .orElse(0.0);

        double RQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentRqScore() - RQ_avg, 2))
            .average()
            .orElse(0.0);

        double CQ_variance = studentRepository.findAll().stream()
            .mapToDouble(student -> Math.pow(student.getStudentCqScore() - CQ_avg, 2))
            .average()
            .orElse(0.0);

        double LQ_stdDev = Math.sqrt(LQ_variance);
        double RQ_stdDev = Math.sqrt(RQ_variance);
        double CQ_stdDev = Math.sqrt(CQ_variance);

        return List.of(LQ_stdDev, RQ_stdDev, CQ_stdDev);
    }

    @Transactional
    public void updateAdjustedScores() {
        List<Student> students = studentRepository.findAll();
        List<Double> avgQ = calculateAvg();
        List<Double> stdDeviationQ = calculateStdDeviation();

        Double lqAvg = avgQ.get(0);
        Double rqAvg = avgQ.get(1);
        Double cqAvg = avgQ.get(2);

        System.out.println("LQ평균 : "+lqAvg+"\tRQ평균 : "+rqAvg+"\tCQ평균 : "+cqAvg);

        Double lqStdDev = stdDeviationQ.get(0);
        Double rqStdDev = stdDeviationQ.get(1);
        Double cqStdDev = stdDeviationQ.get(2);

        System.out.println("LQ표편 : "+lqStdDev+"\tRQ표편 : "+rqStdDev+"\tCQ표편 : "+cqStdDev);

        LRCRatio ratio = lrcRatioRepository.findAll().get(0);

        for (Student student : students) {
            double adjustLqScore = (((student.getStudentLqScore() - lqAvg) / lqStdDev) * 10 + 50) * ratio.getLqRatio() /100;
            double adjustRqScore = (((student.getStudentRqScore() - rqAvg) / rqStdDev) * 10 + 50) * ratio.getRqRatio()/100;
            double adjustCqScore = (((student.getStudentCqScore() - cqAvg) / cqStdDev) * 10 + 50) * ratio.getCqRatio()/100;

            student.setAdjustLqScore((float) adjustLqScore);
            student.setAdjustRqScore((float) adjustRqScore);
            student.setAdjustCqScore((float) adjustCqScore);

            studentRepository.save(student);
        }
    }

    public void calculateRawScores() {
        List<Student> students = studentRepository.findAll();

        for (Student student : students) {
            String studentId = student.getStudentId();

            LQStudent lqStudent = lqStudentRepository.findById(studentId).orElse(null);
            RQStudent rqStudent = rqStudentRepository.findById(studentId).orElse(null);
            CQStudent cqStudent = cqStudentRepository.findById(studentId).orElse(null);

            if (lqStudent != null && rqStudent != null && cqStudent != null) {
                List<LQWeight> lqWeights = lqWeightRepository.findAll();
                List<RQWeight> rqWeights = rqWeightRepository.findAll();
                List<CQWeight> cqWeights = cqWeightRepository.findAll();

                // LQ, RQ, CQ 점수 계산
                float lqScore = calculateScore(lqStudent, lqWeights, "LQ");
                float rqScore = calculateScore(rqStudent, rqWeights, "RQ");
                float cqScore = calculateScore(cqStudent, cqWeights, "CQ");

                // 점수 업데이트
                student.setStudentLqScore(lqScore);
                student.setStudentRqScore(rqScore);
                student.setStudentCqScore(cqScore);

                // LQ, RQ, CQ 건수 계산
                student.setStudentLqNum(calculateNum(lqStudent));
                student.setStudentRqNum(calculateNum(rqStudent));
                student.setStudentCqNum(calculateNum(cqStudent));

                studentRepository.save(student);
            }
        }
    }
}
