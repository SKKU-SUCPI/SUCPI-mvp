package com.skku.sucpi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skku.sucpi.entity.LRCContent;
import com.skku.sucpi.repository.LRCContentRepository;

@Service
public class LRCContentService {

    @Autowired
    private LRCContentRepository lrcContentRepository;

    public List<LRCContent> findAll() {
        return lrcContentRepository.findAll();
    }

    public LRCContent findById(Long id) {
        return lrcContentRepository.findById(id).orElse(null);
    }

    public LRCContent save(LRCContent lrcContent) {
        return lrcContentRepository.save(lrcContent);
    }

    public void deleteById(Long id) {
        lrcContentRepository.deleteById(id);
    }
}
