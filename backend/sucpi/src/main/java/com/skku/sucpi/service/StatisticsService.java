package com.skku.sucpi.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.skku.sucpi.repository.StudentRepository;
import com.skku.sucpi.repository.CQStudentRepository;
import com.skku.sucpi.repository.CQWeightRepository;
import com.skku.sucpi.repository.LQStudentRepository;
import com.skku.sucpi.repository.LQWeightRepository;
import com.skku.sucpi.repository.RQStudentRepository;
import com.skku.sucpi.repository.RQWeightRepository;
import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.entity.Student;
import com.skku.sucpi.dto.StatisticsDTO;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.math.BigInteger;
import java.text.DecimalFormat;
@Service
public class StatisticsService {

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

    //특정 클래스의 모든 int 필드를 0으로 초기화하는 맵을 생성
    private Map<String, Integer> initializeFieldMap(Class<?> clazz) {
        Map<String, Integer> fieldMap = new HashMap<>();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getType().equals(int.class)) {
                fieldMap.put(field.getName(), 0);
            }
        }
        return fieldMap;
    }

    // 세 수의 최소공배수를 계산하는 함수
    public static BigInteger lcm(long num1, long num2, long num3) {
        BigInteger a = BigInteger.valueOf(num1);
        BigInteger b = BigInteger.valueOf(num2);
        BigInteger c = BigInteger.valueOf(num3);
        return lcm(lcm(a, b), c);
    }

    // 두 BigInteger 수의 최소공배수를 계산하는 도우미 함수
    private static BigInteger lcm(BigInteger x, BigInteger y) {
        return x.multiply(y).divide(x.gcd(y));
    }

    // .0 자리까지 출력
    public class FormatHelper {
        private static final DecimalFormat df = new DecimalFormat("#.0");
    
        public static double formatDouble(double value) {
            return Double.parseDouble(df.format(value));
        }
    }

    //학년,학과 필터
    public List<Student> getFilteredResults(List<String> grades, List<String> majors) {
        Stream<Student> stream = studentRepository.findAll().stream();

        if (!grades.contains("all") && !grades.isEmpty()) {
            stream = stream.filter(student -> grades.contains(String.valueOf(student.getStudentGrade())));
        }
        if (!majors.contains("all") && !majors.isEmpty()) {
            stream = stream.filter(student -> majors.contains(student.getStudentMajor()));
        }

        return stream.collect(Collectors.toList());
    }

    //3Q 수행 비율
    public Map<String, Double> countActivitiesByQ(List<String> Q, List<String> Grade, List<String> Major) {
        List<Student> filteredStudents = studentRepository.findAll().stream()
            .filter(student -> Grade.contains(String.valueOf(student.getStudentGrade())) || Grade.contains("all"))
            .filter(student -> Major.contains(student.getStudentMajor()) || Major.contains("all"))
            .collect(Collectors.toList());

        Map<String, Double> activitiesCount = new HashMap<>();

        Double totalRqNum = filteredStudents.stream()
            .mapToDouble(Student::getStudentRqNum)
            .sum();

        Double totalLqNum = filteredStudents.stream()
            .mapToDouble(Student::getStudentLqNum)
            .sum();

        Double totalCqNum = filteredStudents.stream()
            .mapToDouble(Student::getStudentCqNum)
            .sum();

        Double totalQ = totalRqNum + totalLqNum + totalCqNum;

        if (Q.contains("all")) {
            activitiesCount.put("LQ,RQ,CQ",FormatHelper.formatDouble(totalQ));
        }
        if (Q.contains("rq") || Q.contains("all")) {
            activitiesCount.put("RQ", FormatHelper.formatDouble(totalRqNum));
        }
        if (Q.contains("lq") || Q.contains("all")) {
            activitiesCount.put("LQ", FormatHelper.formatDouble(totalLqNum));
        }
        if (Q.contains("cq") || Q.contains("all")) {
            activitiesCount.put("CQ", FormatHelper.formatDouble(totalCqNum));
        }

        return activitiesCount;
    }

    //학과 별 비율
    public Map<String, Map<String, Double>> countActivitiesByMajor(List<String> Q, List<String> Grade, List<String> Major) {
        List<Student> filteredStudents = studentRepository.findAll().stream()
            .filter(student -> Grade.contains(String.valueOf(student.getStudentGrade())) || Grade.contains("all"))
            .filter(student -> Major.contains(student.getStudentMajor()) || Major.contains("all"))
            .collect(Collectors.toList());

        Map<String, Double> totalActivities = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentMajor,
                Collectors.summingDouble(student ->
                    student.getStudentRqNum() +
                    student.getStudentLqNum() +
                    student.getStudentCqNum())));

        Map<String, Double> totalLQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentMajor,
                Collectors.summingDouble(Student::getStudentLqNum)));

        Map<String, Double> totalRQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentMajor,
                Collectors.summingDouble(Student::getStudentRqNum)));

        Map<String, Double> totalCQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentMajor,
                Collectors.summingDouble(Student::getStudentCqNum)));

        Map<String, Map<String, Double>> results = new HashMap<>();
        for (String q : Q) {
            switch (q.toLowerCase()) {
                case "lq":
                    results.put("LQ", totalLQ);
                    break;
                case "rq":
                    results.put("RQ", totalRQ);
                    break;
                case "cq":
                    results.put("CQ", totalCQ);
                    break;
                default:
                    results.put("Total", totalActivities);
                    break;
            }
        }

        return results;
    }

    //학년 별 비율
    public Map<String, Map<Integer, Integer>> countActivitiesByGrade(List<String> Q, List<String> Grade, List<String> Major) {
        List<Student> filteredStudents = studentRepository.findAll().stream()
            .filter(student -> Grade.contains(String.valueOf(student.getStudentGrade())) || Grade.contains("all"))
            .filter(student -> Major.contains(student.getStudentMajor()) || Major.contains("all"))
            .collect(Collectors.toList());

        Map<Integer, Integer> totalActivities = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentGrade,
                Collectors.summingInt(student ->
                    student.getStudentRqNum() +
                    student.getStudentLqNum() +
                    student.getStudentCqNum())));

        Map<Integer, Integer> totalLQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentGrade,
                Collectors.summingInt(Student::getStudentLqNum)));

        Map<Integer, Integer> totalRQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentGrade,
                Collectors.summingInt(Student::getStudentRqNum)));

        Map<Integer, Integer> totalCQ = filteredStudents.stream()
            .collect(Collectors.groupingBy(
                Student::getStudentGrade,
                Collectors.summingInt(Student::getStudentCqNum)));

        Map<String, Map<Integer, Integer>> results = new HashMap<>();
        for (String q : Q) {
            switch (q.toLowerCase()) {
                case "lq":
                    results.put("LQ", totalLQ);
                    break;
                case "rq":
                    results.put("RQ", totalRQ);
                    break;
                case "cq":
                    results.put("CQ", totalCQ);
                    break;
                default:
                    results.put("Total", totalActivities);
                    break;
            }
        }

        return results;
    }

    //항목 별 총 건수
    //LQ
    public Map<String, Integer> sumAllLQActivities(List<String> Q,List<String> grade, List<String> major) {
        List<Student> filteredStudents = getFilteredResults(grade, major);
        System.out.println("Filtered LQ Students Count: " + filteredStudents.size());  // 로그 추가

        Set<String> studentIds = filteredStudents.stream()
            .map(Student::getStudentId)
            .collect(Collectors.toSet());
    
        // 효율적인 데이터베이스 조회
        List<LQStudent> lqStudents = lqStudentRepository.findByStudentIdIn(studentIds);

        System.out.println("Filtered LQ Students Count: " + lqStudents.size());  // 로그 추가
    
        Map<String, Integer> totalLQs = new HashMap<>();
        for (Field field : LQStudent.class.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getType().equals(int.class)) {
                int sum = lqStudents.stream().mapToInt(st -> {
                    try {
                        return field.getInt(st);
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException("Field access error", e);
                    }
                }).sum();
                if(Q.contains("lq") || Q.contains("all")) totalLQs.put(field.getName(), sum);
                else totalLQs.put(field.getName(), 0);
            }
        }
        return totalLQs;
    }
    //RQ
    public Map<String, Integer> sumAllRQActivities(List<String> Q,List<String> grade, List<String> major) {
        List<Student> filteredStudents = getFilteredResults(grade, major);
        System.out.println("Filtered RQ Students Count: " + filteredStudents.size());  // 로그 추가

        Set<String> studentIds = filteredStudents.stream()
            .map(Student::getStudentId)
            .collect(Collectors.toSet());
    
        List<RQStudent> rqStudents = rqStudentRepository.findAll().stream()
            .filter(rqStudent -> studentIds.contains(rqStudent.getStudentId()))
            .collect(Collectors.toList());
    
        System.out.println("Filtered RQ Students Count: " + rqStudents.size());  // 로그 추가

        Map<String, Integer> totalRQs = new HashMap<>();
        for (Field field : RQStudent.class.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getType().equals(int.class)) {
                int sum = rqStudents.stream().mapToInt(st -> {
                    try {
                        return field.getInt(st);
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException("Field access error", e);
                    }
                }).sum();
                if(Q.contains("rq") || Q.contains("all")) totalRQs.put(field.getName(), sum);
                else totalRQs.put(field.getName(), 0);
            }
        }
        return totalRQs;
    }
    //CQ
    public Map<String, Integer> sumAllCQActivities(List<String> Q,List<String> grade, List<String> major) {
        List<Student> filteredStudents = getFilteredResults(grade, major);
        System.out.println("Filtered CQ Students Count: " + filteredStudents.size());  // 로그 추가

        Set<String> studentIds = filteredStudents.stream()
            .map(Student::getStudentId)
            .collect(Collectors.toSet());
    
        List<CQStudent> cqStudents = cqStudentRepository.findAll().stream()
            .filter(cqStudent -> studentIds.contains(cqStudent.getStudentId()))
            .collect(Collectors.toList());

        System.out.println("Filtered CQ Students Count: " + cqStudents.size());  // 로그 추가
    
        Map<String, Integer> totalCQs = new HashMap<>();
        for (Field field : CQStudent.class.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getType().equals(int.class)) {
                int sum = cqStudents.stream().mapToInt(st -> {
                    try {
                        return field.getInt(st);
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException("Field access error", e);
                    }
                }).sum();
                if(Q.contains("cq") || Q.contains("all")) totalCQs.put(field.getName(), sum);
                else totalCQs.put(field.getName(), 0);
            }
        }
        return totalCQs;
    }

    //학년 별 퍼센트 계산
    public Map<String, Double> gradePercentileCalculator(List<String> Q, List<String> Grade, List<String> Major) {
        Map<String, Map<Integer, Integer>> totalGrade = countActivitiesByGrade(Q, Grade, Major);
    
        Map<Integer, Integer> totalGrade_LqNum = totalGrade.getOrDefault("LQ", Collections.emptyMap());
        Map<Integer, Integer> totalGrade_RqNum = totalGrade.getOrDefault("RQ", Collections.emptyMap());
        Map<Integer, Integer> totalGrade_CqNum = totalGrade.getOrDefault("CQ", Collections.emptyMap());
    
        double totalLQ = totalGrade_LqNum.values().stream().mapToInt(Integer::intValue).sum();
        double totalRQ = totalGrade_RqNum.values().stream().mapToInt(Integer::intValue).sum();
        double totalCQ = totalGrade_CqNum.values().stream().mapToInt(Integer::intValue).sum();
        double total = totalLQ + totalRQ + totalCQ;
    
        Map<String, Double> results = new HashMap<>();
        results.put("1",0.0);
        results.put("2",0.0);
        results.put("3",0.0);
        results.put("4",0.0);
        results.put("5",0.0);
        for (String grade : Grade) {
            Map<String, Double> gradePercentiles = new HashMap<>();
            int gradeNum = Integer.parseInt(grade);
            double total_LRC = totalGrade_LqNum.getOrDefault(gradeNum, 0) + totalGrade_RqNum.getOrDefault(gradeNum, 0) + totalGrade_CqNum.getOrDefault(gradeNum, 0);
            double totalPercent = (total_LRC / total) * 100;
    
            if (Q.contains("lq") || Q.contains("all")) {
                double lqPercent = (totalGrade_LqNum.getOrDefault(gradeNum, 0) / totalLQ) * 100;
                // gradePercentiles.put("LQ", FormatHelper.formatDouble(lqPercent));
            }
            if (Q.contains("rq") || Q.contains("all")) {
                double rqPercent = (totalGrade_RqNum.getOrDefault(gradeNum, 0) / totalRQ) * 100;
                // gradePercentiles.put("RQ", FormatHelper.formatDouble(rqPercent));
            }
            if (Q.contains("cq") || Q.contains("all")) {
                double cqPercent = (totalGrade_CqNum.getOrDefault(gradeNum, 0) / totalCQ) * 100;
                // gradePercentiles.put("CQ", FormatHelper.formatDouble(cqPercent));
            }
            gradePercentiles.put("ALL", FormatHelper.formatDouble(totalPercent));

            results.put(grade, FormatHelper.formatDouble(totalPercent));
        }
        return results;
    }
    

    //학과 별 퍼센트 계산
    public Map<String, Double> majorPercentileCalculator(List<String> Q, List<String> Grade, List<String> Major) {
        Map<String, Map<String, Double>> totalMajor = countActivitiesByMajor(Q, Grade, Major);
    
        Map<String, Double> totalMajor_LqNum = totalMajor.getOrDefault("LQ", Collections.emptyMap());
        Map<String, Double> totalMajor_RqNum = totalMajor.getOrDefault("RQ", Collections.emptyMap());
        Map<String, Double> totalMajor_CqNum = totalMajor.getOrDefault("CQ", Collections.emptyMap());
    
        Map<String, Double> results = new HashMap<>();
        double totalLQ = totalMajor_LqNum.values().stream().mapToDouble(Double::doubleValue).sum();
        double totalRQ = totalMajor_RqNum.values().stream().mapToDouble(Double::doubleValue).sum();
        double totalCQ = totalMajor_CqNum.values().stream().mapToDouble(Double::doubleValue).sum();
        results.put("GC",0.0);
        results.put("AI",0.0);
        results.put("SW",0.0);
        for (String major : Major) {
            Map<String, Double> majorPercentiles = new HashMap<>();
            double total_LRC = 0.0;
            double total = 0.0;
    
            if (Q.contains("lq") || Q.contains("all")) {
                double lqPercent = totalMajor_LqNum.getOrDefault(major, 0.0) / (totalLQ == 0 ? 1 : totalLQ) * 100;
                total_LRC += totalMajor_LqNum.getOrDefault(major, 0.0);
                total += totalLQ;
                // majorPercentiles.put("LQ", lqPercent);
            }
            if (Q.contains("rq") || Q.contains("all")) {
                double rqPercent = totalMajor_RqNum.getOrDefault(major, 0.0) / (totalRQ == 0 ? 1 : totalRQ) * 100;
                total_LRC += totalMajor_RqNum.getOrDefault(major, 0.0);
                total += totalRQ;
                // majorPercentiles.put("RQ", rqPercent);
            }
            if (Q.contains("cq") || Q.contains("all")) {
                double cqPercent = totalMajor_CqNum.getOrDefault(major, 0.0) / (totalCQ == 0 ? 1 : totalCQ) * 100;
                total_LRC += totalMajor_CqNum.getOrDefault(major, 0.0);
                total += totalCQ;
                // majorPercentiles.put("CQ", cqPercent);
            }
            
            double totalPercent = total_LRC / (total == 0 ? 1 : total) * 100;
            majorPercentiles.put("ALL", FormatHelper.formatDouble(totalPercent));
            
            results.put(major,FormatHelper.formatDouble(totalPercent));
        }
        
        return results;
    }
    
    //Q별 퍼센트 계산
    public Map<String, Double> QPercentileCalculator(List<String> Q, List<String> Grade, List<String> Major) {
        Map<String, Double> totalQ = countActivitiesByQ(Q, Grade, Major);
        Double totalLQ = totalQ.getOrDefault("LQ", 0.0);
        Double totalRQ = totalQ.getOrDefault("RQ", 0.0);
        Double totalCQ = totalQ.getOrDefault("CQ", 0.0);
        Double denominator = totalLQ + totalRQ + totalCQ;
    
        Map<String, Double> Qpercentiles = new HashMap<>();
        Qpercentiles.put("LQ",0.0);
        Qpercentiles.put("RQ",0.0);
        Qpercentiles.put("CQ",0.0);
    
        if (denominator > 0) { // 분모가 0보다 클 때만 계산
            if (Q.contains("lq") || Q.contains("all")) {
                Qpercentiles.put("LQ", FormatHelper.formatDouble((totalLQ / denominator) * 100));
            }
            if (Q.contains("rq") || Q.contains("all")) {
                Qpercentiles.put("RQ", FormatHelper.formatDouble((totalRQ / denominator) * 100));
            }
            if (Q.contains("cq") || Q.contains("all")) {
                Qpercentiles.put("CQ", FormatHelper.formatDouble((totalCQ / denominator) * 100));
            }
        } else {
            // 분모가 0인 경우 0% 처리
            if (Q.contains("lq") || Q.contains("all")) {
                Qpercentiles.put("LQ", 0.0);
            }
            if (Q.contains("rq") || Q.contains("all")) {
                Qpercentiles.put("RQ", 0.0);
            }
            if (Q.contains("cq") || Q.contains("all")) {
                Qpercentiles.put("CQ", 0.0);
            }
        }
    
        return Qpercentiles;
    }

    public StatisticsDTO getStatistics(List<String> Q, List<String> Grade, List<String> Major) {
        Map<String,Double> totalQ = countActivitiesByQ(Q,Grade,Major);
        Map<String,Map<String,Double>> totalMajor = countActivitiesByMajor(Q,Grade,Major);
        Map<String,Map<Integer,Integer>> totalGrade = countActivitiesByGrade(Q,Grade,Major);

        Map<String,Double> q_statistics = QPercentileCalculator(Q, Grade, Major);
        Map<String,Double> grade_statistics = gradePercentileCalculator(Q, Grade, Major);
        Map<String,Double> major_statistics = majorPercentileCalculator(Q, Grade, Major);

        Map<String, Integer> totalLQs = sumAllLQActivities(Q,Grade, Major);
        Map<String, Integer> totalRQs = sumAllRQActivities(Q,Grade, Major);
        Map<String, Integer> totalCQs = sumAllCQActivities(Q,Grade, Major);

        return new StatisticsDTO(
            // totalQ,
            q_statistics,
            // totalMajor,
            major_statistics,
            // totalGrade,
            grade_statistics,
            totalLQs,
            totalRQs,
            totalCQs
        );
    }
}
