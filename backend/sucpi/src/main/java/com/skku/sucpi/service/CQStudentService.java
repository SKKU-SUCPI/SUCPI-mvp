package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.CQStudent;
import com.skku.sucpi.repository.CQStudentRepository;

@Service
public class CQStudentService {

    @Autowired
    private CQStudentRepository cqStudentRepository;

    public List<CQStudent> findAll() {
        return cqStudentRepository.findAll();
    }

    public CQStudent findById(String id) {
        return cqStudentRepository.findById(id).orElse(null);
    }

    public CQStudent save(CQStudent cqStudent) {
        return cqStudentRepository.save(cqStudent);
    }

    public void deleteById(String id) {
        cqStudentRepository.deleteById(id);
    }
}

