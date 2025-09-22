package com.example.demo.service;

import com.example.demo.model.Portfolio;
import com.example.demo.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    // Save or update a portfolio
    public void savePortfolio(String username, Portfolio portfolio) {
        portfolio.setUsername(username); // Ensure the username is set
        portfolioRepository.save(portfolio);
    }

    // Retrieve a portfolio by username
    public Optional<Portfolio> getPortfolioByUsername(String username) {
        return portfolioRepository.findByUsername(username);
    }
}
