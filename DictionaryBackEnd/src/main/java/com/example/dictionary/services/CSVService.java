package com.example.dictionary.services;

import com.example.dictionary.utility.CSVMerger;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CSVService {

    public void mergeCsvFiles(int numberOfFiles, String outputPrefix, String finalOutput) {
        try {
            CSVMerger.mergeCSVFiles(outputPrefix, numberOfFiles, finalOutput);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
