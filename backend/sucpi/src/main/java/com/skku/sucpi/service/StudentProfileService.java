package com.skku.sucpi.service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.StudentProfileDTO;
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
            return new StudentProfileDTO(
                    student.getStudentId(),
                    student.getStudentName(),
                    student.getStudentMajor(),
                    student.getStudentPhoneNum(),
                    lqStudentOpt.get(),
                    rqStudentOpt.get(),
                    cqStudentOpt.get(),
                    lrcContents
            );
        }
        return null;
    }

    @Transactional
    public void saveStudentProfile(StudentProfileDTO studentProfileDTO) {
        Student student = studentRepository.findById(studentProfileDTO.getStudentId()).orElse(new Student());
        student.setStudentId(studentProfileDTO.getStudentId());
        student.setStudentName(studentProfileDTO.getStudentName());
        student.setStudentMajor(studentProfileDTO.getStudentMajor());
        student.setStudentPhoneNum(studentProfileDTO.getStudentPhoneNum());

        lqStudentRepository.save(studentProfileDTO.getLqStudent());
        rqStudentRepository.save(studentProfileDTO.getRqStudent());
        cqStudentRepository.save(studentProfileDTO.getCqStudent());

        // 기존 LRCContent 삭제
        lrcContentRepository.deleteByStudentId(student.getStudentId());

        // 새로운 LRCContent 저장
        for (LRCContent content : studentProfileDTO.getLrcContents()) {
            content.setStudentId(student.getStudentId());
            lrcContentRepository.save(content);
        }

        studentRepository.save(student);

        // LQ, RQ, CQ의 건수 및 점수를 업데이트
        updateStudentScores(student.getStudentId());
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
