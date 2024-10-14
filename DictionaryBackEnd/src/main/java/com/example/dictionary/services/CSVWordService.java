package com.example.dictionary.services;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVWordService {

    private final List<String> availableWords = new ArrayList<>();

    // Constructor that loads data from the CSV file when the service is instantiated
    public CSVWordService() {
        loadWordsFromCsv("src/main/resources/static/dictionarySources/merriam_words.csv");
    }

    private void loadWordsFromCsv(String filePath) {
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> lines = reader.readAll();
            for (String[] line : lines) {
                if (line.length >= 2) {
                    String word = line[1].trim().toLowerCase();  // Second column contains the word
                    availableWords.add(word);
                }
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
    }

    public List<String> getAllWords() {
        return availableWords;
    }
}
