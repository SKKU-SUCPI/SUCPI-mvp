package com.skku.sucpi.service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.dto.StudentDTO;
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
public class StudentService {

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

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student findById(String id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student save(Student student) {
        return studentRepository.save(student);
    }

    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

    @Transactional
    public StudentDTO getStudentById(String studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        Optional<LQStudent> lqStudent = lqStudentRepository.findById(studentId);
        Optional<RQStudent> rqStudent = rqStudentRepository.findById(studentId);
        Optional<CQStudent> cqStudent = cqStudentRepository.findById(studentId);
        List<LRCContent> lrcContents = lrcContentRepository.findByStudentId(studentId);

        if (student.isPresent() && lqStudent.isPresent() && rqStudent.isPresent() && cqStudent.isPresent()) {
            return new StudentDTO(student.get(), lqStudent.get(), rqStudent.get(), cqStudent.get(), lrcContents);
        }
        return null;
    }

    @Transactional
    public StudentDTO saveStudent(StudentDTO studentDTO) {
        Student student = studentDTO.getStudent();

        if (Float.isNaN(student.getAdjustCqScore())) student.setAdjustCqScore(0.0f);
        if (Float.isNaN(student.getAdjustLqScore())) student.setAdjustLqScore(0.0f);
        if (Float.isNaN(student.getAdjustRqScore())) student.setAdjustRqScore(0.0f);
        if (Float.isNaN(student.getStudentCqScore())) student.setStudentCqScore(0.0f);
        if (Float.isNaN(student.getStudentLqScore())) student.setStudentLqScore(0.0f);
        if (Float.isNaN(student.getStudentRqScore())) student.setStudentRqScore(0.0f);

        Student savedStudent = studentRepository.save(studentDTO.getStudent());
        lqStudentRepository.save(studentDTO.getLqInfo());
        rqStudentRepository.save(studentDTO.getRqInfo());
        cqStudentRepository.save(studentDTO.getCqInfo());

        // 기존 LRCContent 삭제
        //lrcContentRepository.deleteByStudentId(savedStudent.getStudentId());

        // 새로운 LRCContent 저장
        for (LRCContent content : studentDTO.getLrcContents()) {
            lrcContentRepository.save(content);
        }

        // LQ, RQ, CQ의 건수 및 점수를 업데이트
        updateStudentScores(savedStudent.getStudentId());

        return new StudentDTO(savedStudent, studentDTO.getLqInfo(), studentDTO.getRqInfo(), studentDTO.getCqInfo(), studentDTO.getLrcContents());
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

            if (Float.isNaN(lqScore)) lqScore = 0.0f;
            if (Float.isNaN(rqScore)) rqScore = 0.0f;
            if (Float.isNaN(cqScore)) cqScore = 0.0f;

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
            //System.out.println("점수계산 시작");
            if (field.getType() == int.class) {
                //System.out.println("int통과");
                field.setAccessible(true);
                try {
                    //System.out.println("try통과");
                    int value = field.getInt(student);
                    for (Object weight : weights) {
                        //System.out.println("반복분 통과");
                        Field datanameField = weight.getClass().getDeclaredField("dataname");
                        datanameField.setAccessible(true);
                        String dataname = (String) datanameField.get(weight);
                        //System.out.println("dataname: " + dataname + ", field.getName(): " + field.getName());
                        if (dataname.equalsIgnoreCase(field.getName())) { // 필드 이름과 대소문자 구분 없이 비교
                            //System.out.println("찐 계산 if통과");
                            Field weightField = weight.getClass().getDeclaredField("weight");
                            weightField.setAccessible(true);
                            float weightValue = weightField.getFloat(weight);
                            float fieldScore = value * weightValue;

                            if (Float.isNaN(fieldScore)) {
                                fieldScore = 0.0f;
                            }

                            score += fieldScore;
                            //System.out.println(category + " Score Calculation: " + field.getName() + " (" + value + ") * " + weightValue + " = " + fieldScore);
                            //System.out.println("Column Name: " + field.getName() + ", Dataname: " + dataname);
                            break;
                        }
                    }
                } catch (IllegalAccessException | NoSuchFieldException e) {
                    e.printStackTrace();
                }
            }
        }

        if (Float.isNaN(score)) {
            score = 0.0f;
        }

        System.out.println(category + " Total Score: " + score);
        return score;
    }
}
