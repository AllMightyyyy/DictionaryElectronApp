package com.example.dictionary.services;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CSVDefinitionService {

    private final Map<String, String> wordDefinitions = new HashMap<>();

    // Constructor that loads data from the CSV file when the service is instantiated
    public CSVDefinitionService() {
        loadDefinitionsFromCsv("src/main/resources/static/dictionarySources/final_output.csv");
    }

    private void loadDefinitionsFromCsv(String filePath) {
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> lines = reader.readAll();
            for (String[] line : lines) {
                if (line.length >= 2) {
                    String word = line[0].trim().toLowerCase();
                    String definition = line[1].trim();
                    wordDefinitions.put(word, definition);
                }
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
    }

    public String getDefinition(String word) {
        return wordDefinitions.getOrDefault(word.toLowerCase(), "Definition not found.");
    }

    public Map<String, String> getAllDefinitions() {
        return wordDefinitions;
    }
}
