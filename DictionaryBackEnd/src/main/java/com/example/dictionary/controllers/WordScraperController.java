package com.example.dictionary.controllers;

import com.example.dictionary.services.CSVService;
import com.example.dictionary.services.DefinitionScraperService;
import com.example.dictionary.services.WordScraperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WordScraperController {

    @Autowired
    private WordScraperService wordScraperService;

    @Autowired
    private CSVService csvService;

    @Autowired
    private DefinitionScraperService definitionScraperService;

    // Endpoint to scrape words
    @GetMapping("/api/scrape-words")
    public String scrapeWords() {
        wordScraperService.scrapeWords();
        return "Word scraping process started!";
    }

    // Endpoint to scrape definitions
    @GetMapping("/api/scrape-definitions")
    public String scrapeDefinitions() {
        definitionScraperService.scrapeDefinitions();
        return "Definition scraping process started!";
    }

    @GetMapping("/api/merge-csv")
    public String mergeCsv() {
        csvService.mergeCsvFiles(6, "output_", "final_output.csv");
        return "CSV files merged successfully!";
    }
}
