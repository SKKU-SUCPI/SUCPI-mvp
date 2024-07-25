package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.LQStudent;
import com.skku.sucpi.repository.LQStudentRepository;

@Service
public class LQStudentService {

    @Autowired
    private LQStudentRepository lqStudentRepository;

    public List<LQStudent> findAll() {
        return lqStudentRepository.findAll();
    }

    public LQStudent findById(String id) {
        return lqStudentRepository.findById(id).orElse(null);
    }

    public LQStudent save(LQStudent lqStudent) {
        return lqStudentRepository.save(lqStudent);
    }

    public void deleteById(String id) {
        lqStudentRepository.deleteById(id);
    }
}

