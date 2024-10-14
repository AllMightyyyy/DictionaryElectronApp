package com.example.dictionary.services;

import com.example.dictionary.scraper.MerriamWebsterWordScraper;
import org.springframework.stereotype.Service;

@Service
public class WordScraperService {

    public void scrapeWords() {
        // Trigger the word scraping logic
        MerriamWebsterWordScraper scraper = new MerriamWebsterWordScraper();
        scraper.main(new String[0]); // Assuming your main method handles the scraping process
    }
}
