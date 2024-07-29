package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.RQStudent;
import com.skku.sucpi.repository.RQStudentRepository;

@Service
public class RQStudentService {

    @Autowired
    private RQStudentRepository rqStudentRepository;

    public List<RQStudent> findAll() {
        return rqStudentRepository.findAll();
    }

    public RQStudent findById(String id) {
        return rqStudentRepository.findById(id).orElse(null);
    }

    public RQStudent save(RQStudent rqStudent) {
        return rqStudentRepository.save(rqStudent);
    }

    public void deleteById(String id) {
        rqStudentRepository.deleteById(id);
    }
}

