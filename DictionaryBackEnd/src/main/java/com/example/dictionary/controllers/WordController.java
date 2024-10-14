package com.example.dictionary.controllers;

import com.example.dictionary.services.CSVDefinitionService;
import com.example.dictionary.services.CSVWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class WordController {

    @Autowired
    private CSVDefinitionService csvDefinitionService;

    @Autowired
    private CSVWordService csvWordService;

    // Endpoint to get the definition of a word
    @GetMapping("/api/definition")
    public String getDefinition(@RequestParam String word) {
        return csvDefinitionService.getDefinition(word);
    }

    // Endpoint to get all available words from merriam_words.csv
    @GetMapping("/api/words")
    public List<String> getAvailableWords() {
        return csvWordService.getAllWords();
    }

    // Optional: Endpoint to get all definitions in the final_output.csv
    @GetMapping("/api/all-definitions")
    public Map<String, String> getAllDefinitions() {
        return csvDefinitionService.getAllDefinitions();
    }
}
