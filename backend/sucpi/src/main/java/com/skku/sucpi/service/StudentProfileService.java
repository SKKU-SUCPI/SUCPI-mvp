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
import com.skku.sucpi.dto.StudentProfileDTO.RQInfo;
import com.skku.sucpi.dto.StudentProfileDTO.StudentInfo;
import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.CQWeight;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.LQWeight;
import com.skku.sucpi.entity.LRCContent;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.RQWeight;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.repository.CQStudentRepository;
import com.skku.sucpi.repository.CQWeightRepository;
import com.skku.sucpi.repository.LQStudentRepository;
import com.skku.sucpi.repository.LQWeightRepository;
import com.skku.sucpi.repository.LRCContentRepository;
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
            rqInfo.setYulJcr5Main(getContentsList(lrcContents, "yulJcr5Main"));
            rqInfo.setYulJcr5Part(getContentsList(lrcContents, "yulJcr5Part"));
            rqInfo.setYulJcr10Main(getContentsList(lrcContents, "yulJcr10Main"));
            rqInfo.setYulJcr10Part(getContentsList(lrcContents, "yulJcr10Part"));
            rqInfo.setYulKnownSpeech(getContentsList(lrcContents, "yulKnownSpeech"));
            rqInfo.setYulKnownPoster(getContentsList(lrcContents, "yulKnownPoster"));
            rqInfo.setYulNormalSpeech(getContentsList(lrcContents, "yulNormalSpeech"));
            rqInfo.setYulNormalPoster(getContentsList(lrcContents, "yulNormalPoster"));
            rqInfo.setYulNationalSpeech(getContentsList(lrcContents, "yulNationalSpeech"));
            rqInfo.setYulNationalPoster(getContentsList(lrcContents, "yulNationalPoster"));
            rqInfo.setYulTopBigCompetition(getContentsList(lrcContents, "yulTopBigCompetition"));
            rqInfo.setYulWinBigCompetition(getContentsList(lrcContents, "yulWinBigCompetition"));
            rqInfo.setYulPlayBigCompetition(getContentsList(lrcContents, "yulPlayBigCompetition"));
            rqInfo.setYulTopSchoolCompetition(getContentsList(lrcContents, "yulTopSchoolCompetition"));
            rqInfo.setYulWinSchoolCompetition(getContentsList(lrcContents, "yulWinSchoolCompetition"));
            rqInfo.setYulPlaySchoolCompetition(getContentsList(lrcContents, "yulPlaySchoolCompetition"));
            rqInfo.setMyeongOverKci(getContentsList(lrcContents, "myeongOverKci"));
            rqInfo.setMyeongKciExcellent(getContentsList(lrcContents, "myeongKciExcellent"));
            rqInfo.setMyeongKci(getContentsList(lrcContents, "myeongKci"));
            rqInfo.setMyeongKciCandidate(getContentsList(lrcContents, "myeongKciCandidate"));
            rqInfo.setMyeongKnownSpeech(getContentsList(lrcContents, "myeongKnownSpeech"));
            rqInfo.setMyeongNormalSpeech(getContentsList(lrcContents, "myeongNormalSpeech"));
            rqInfo.setMyeongNationalSpeech(getContentsList(lrcContents, "myeongNationalSpeech"));
            rqInfo.setMyeongTopBigCompetition(getContentsList(lrcContents, "myeongTopBigCompetition"));
            rqInfo.setMyeongWinBigCompetition(getContentsList(lrcContents, "myeongWinBigCompetition"));
            rqInfo.setMyeongPlayBigCompetition(getContentsList(lrcContents, "myeongPlayBigCompetition"));
            rqInfo.setMyeongTopSchoolCompetition(getContentsList(lrcContents, "myeongTopSchoolCompetition"));
            rqInfo.setMyeongWinSchoolCompetition(getContentsList(lrcContents, "myeongWinSchoolCompetition"));
            rqInfo.setMyeongPlaySchoolCompetition(getContentsList(lrcContents, "myeongPlaySchoolCompetition"));

            CQInfo cqInfo = new CQInfo();
            cqInfo.setStudentId(student.getStudentId());
            cqInfo.setCoop(getSingleContent(lrcContents, "coop"));
            cqInfo.setInternship(getSingleContent(lrcContents, "internship"));
            cqInfo.setStartup(getSingleContent(lrcContents, "startup"));
            cqInfo.setOverseaVolunteer(getSingleContent(lrcContents, "overseaVolunteer"));
            cqInfo.setSeminar(getContentsList(lrcContents, "seminar"));
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
            cqInfo.setStudioContribution(cqStudentOpt.get().getStudioContribution());
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
        rqStudent.setYulJcr5Main(studentProfileDTO.getRqInfo().getYulJcr5Main().size());
        rqStudent.setYulJcr5Part(studentProfileDTO.getRqInfo().getYulJcr5Part().size());
        rqStudent.setYulJcr10Main(studentProfileDTO.getRqInfo().getYulJcr10Main().size());
        rqStudent.setYulJcr10Part(studentProfileDTO.getRqInfo().getYulJcr10Part().size());
        rqStudent.setYulKnownSpeech(studentProfileDTO.getRqInfo().getYulKnownSpeech().size());
        rqStudent.setYulKnownPoster(studentProfileDTO.getRqInfo().getYulKnownPoster().size());
        rqStudent.setYulNormalSpeech(studentProfileDTO.getRqInfo().getYulNormalSpeech().size());
        rqStudent.setYulNormalPoster(studentProfileDTO.getRqInfo().getYulNormalPoster().size());
        rqStudent.setYulNationalSpeech(studentProfileDTO.getRqInfo().getYulNationalSpeech().size());
        rqStudent.setYulNationalPoster(studentProfileDTO.getRqInfo().getYulNationalPoster().size());
        rqStudent.setYulTopBigCompetition(studentProfileDTO.getRqInfo().getYulTopBigCompetition().size());
        rqStudent.setYulWinBigCompetition(studentProfileDTO.getRqInfo().getYulWinBigCompetition().size());
        rqStudent.setYulPlayBigCompetition(studentProfileDTO.getRqInfo().getYulPlayBigCompetition().size());
        rqStudent.setYulTopSchoolCompetition(studentProfileDTO.getRqInfo().getYulTopSchoolCompetition().size());
        rqStudent.setYulWinSchoolCompetition(studentProfileDTO.getRqInfo().getYulWinSchoolCompetition().size());
        rqStudent.setYulPlaySchoolCompetition(studentProfileDTO.getRqInfo().getYulPlaySchoolCompetition().size());
        rqStudent.setMyeongOverKci(studentProfileDTO.getRqInfo().getMyeongOverKci().size());
        rqStudent.setMyeongKciExcellent(studentProfileDTO.getRqInfo().getMyeongKciExcellent().size());
        rqStudent.setMyeongKci(studentProfileDTO.getRqInfo().getMyeongKci().size());
        rqStudent.setMyeongKciCandidate(studentProfileDTO.getRqInfo().getMyeongKciCandidate().size());
        rqStudent.setMyeongKnownSpeech(studentProfileDTO.getRqInfo().getMyeongKnownSpeech().size());
        rqStudent.setMyeongNormalSpeech(studentProfileDTO.getRqInfo().getMyeongNormalSpeech().size());
        rqStudent.setMyeongNationalSpeech(studentProfileDTO.getRqInfo().getMyeongNationalSpeech().size());
        rqStudent.setMyeongTopBigCompetition(studentProfileDTO.getRqInfo().getMyeongTopBigCompetition().size());
        rqStudent.setMyeongWinBigCompetition(studentProfileDTO.getRqInfo().getMyeongWinBigCompetition().size());
        rqStudent.setMyeongPlayBigCompetition(studentProfileDTO.getRqInfo().getMyeongPlayBigCompetition().size());
        rqStudent.setMyeongTopSchoolCompetition(studentProfileDTO.getRqInfo().getMyeongTopSchoolCompetition().size());
        rqStudent.setMyeongWinSchoolCompetition(studentProfileDTO.getRqInfo().getMyeongWinSchoolCompetition().size());
        rqStudent.setMyeongPlaySchoolCompetition(studentProfileDTO.getRqInfo().getMyeongPlaySchoolCompetition().size());

        CQStudent cqStudent = new CQStudent();
        cqStudent.setStudentId(studentProfileDTO.getStudentInfo().getId());
        cqStudent.setCoop(isBlank(studentProfileDTO.getCqInfo().getCoop()) ? 0 : 1);
        cqStudent.setInternship(isBlank(studentProfileDTO.getCqInfo().getInternship()) ? 0 : 1);
        cqStudent.setStartup(isBlank(studentProfileDTO.getCqInfo().getStartup()) ? 0 : 1);
        cqStudent.setOverseaVolunteer(isBlank(studentProfileDTO.getCqInfo().getOverseaVolunteer()) ? 0 : 1);
        cqStudent.setSeminar(studentProfileDTO.getCqInfo().getSeminar().size());
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
        cqStudent.setStudioContribution(studentProfileDTO.getCqInfo().getStudioContribution());
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
        saveContents(student.getStudentId(), "yulJcr5Main", studentProfileDTO.getRqInfo().getYulJcr5Main());
        saveContents(student.getStudentId(), "yulJcr5Part", studentProfileDTO.getRqInfo().getYulJcr5Part());
        saveContents(student.getStudentId(), "yulJcr10Main", studentProfileDTO.getRqInfo().getYulJcr10Main());
        saveContents(student.getStudentId(), "yulJcr10Part", studentProfileDTO.getRqInfo().getYulJcr10Part());
        saveContents(student.getStudentId(), "yulKnownSpeech", studentProfileDTO.getRqInfo().getYulKnownSpeech());
        saveContents(student.getStudentId(), "yulKnownPoster", studentProfileDTO.getRqInfo().getYulKnownPoster());
        saveContents(student.getStudentId(), "yulNormalSpeech", studentProfileDTO.getRqInfo().getYulNormalSpeech());
        saveContents(student.getStudentId(), "yulNormalPoster", studentProfileDTO.getRqInfo().getYulNormalPoster());
        saveContents(student.getStudentId(), "yulNationalSpeech", studentProfileDTO.getRqInfo().getYulNationalSpeech());
        saveContents(student.getStudentId(), "yulNationalPoster", studentProfileDTO.getRqInfo().getYulNationalPoster());
        saveContents(student.getStudentId(), "yulTopBigCompetition", studentProfileDTO.getRqInfo().getYulTopBigCompetition());
        saveContents(student.getStudentId(), "yulWinBigCompetition", studentProfileDTO.getRqInfo().getYulWinBigCompetition());
        saveContents(student.getStudentId(), "yulPlayBigCompetition", studentProfileDTO.getRqInfo().getYulPlayBigCompetition());
        saveContents(student.getStudentId(), "yulTopSchoolCompetition", studentProfileDTO.getRqInfo().getYulTopSchoolCompetition());
        saveContents(student.getStudentId(), "yulWinSchoolCompetition", studentProfileDTO.getRqInfo().getYulWinSchoolCompetition());
        saveContents(student.getStudentId(), "yulPlaySchoolCompetition", studentProfileDTO.getRqInfo().getYulPlaySchoolCompetition());
        saveContents(student.getStudentId(), "myeongOverKci", studentProfileDTO.getRqInfo().getMyeongOverKci());
        saveContents(student.getStudentId(), "myeongKciExcellent", studentProfileDTO.getRqInfo().getMyeongKciExcellent());
        saveContents(student.getStudentId(), "myeongKci", studentProfileDTO.getRqInfo().getMyeongKci());
        saveContents(student.getStudentId(), "myeongKciCandidate", studentProfileDTO.getRqInfo().getMyeongKciCandidate());
        saveContents(student.getStudentId(), "myeongKnownSpeech", studentProfileDTO.getRqInfo().getMyeongKnownSpeech());
        saveContents(student.getStudentId(), "myeongNormalSpeech", studentProfileDTO.getRqInfo().getMyeongNormalSpeech());
        saveContents(student.getStudentId(), "myeongNationalSpeech", studentProfileDTO.getRqInfo().getMyeongNationalSpeech());
        saveContents(student.getStudentId(), "myeongTopBigCompetition", studentProfileDTO.getRqInfo().getMyeongTopBigCompetition());
        saveContents(student.getStudentId(), "myeongWinBigCompetition", studentProfileDTO.getRqInfo().getMyeongWinBigCompetition());
        saveContents(student.getStudentId(), "myeongPlayBigCompetition", studentProfileDTO.getRqInfo().getMyeongPlayBigCompetition());
        saveContents(student.getStudentId(), "myeongTopSchoolCompetition", studentProfileDTO.getRqInfo().getMyeongTopSchoolCompetition());
        saveContents(student.getStudentId(), "myeongWinSchoolCompetition", studentProfileDTO.getRqInfo().getMyeongWinSchoolCompetition());
        saveContents(student.getStudentId(), "myeongPlaySchoolCompetition", studentProfileDTO.getRqInfo().getMyeongPlaySchoolCompetition());
        saveContents(student.getStudentId(), "coop", studentProfileDTO.getCqInfo().getCoop());
        saveContents(student.getStudentId(), "internship", studentProfileDTO.getCqInfo().getInternship());
        saveContents(student.getStudentId(), "startup", studentProfileDTO.getCqInfo().getStartup());
        saveContents(student.getStudentId(), "overseaVolunteer", studentProfileDTO.getCqInfo().getOverseaVolunteer());
        saveContents(student.getStudentId(), "seminar", studentProfileDTO.getCqInfo().getSeminar());

        studentRepository.save(student);

        // LQ, RQ, CQ의 건수 및 점수를 업데이트
        updateStudentScores(student.getStudentId());
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
}
