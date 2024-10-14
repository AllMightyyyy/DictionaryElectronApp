package com.example.dictionary.services;

import com.example.dictionary.scraper.MerriamWebsterDefinitionScraper;
import org.springframework.stereotype.Service;

@Service
public class DefinitionScraperService {

    public void scrapeDefinitions() {
        // Trigger the definition scraping logic
        MerriamWebsterDefinitionScraper scraper = new MerriamWebsterDefinitionScraper();
        scraper.main(new String[0]);  // Assuming your main method handles the scraping process
    }
}
