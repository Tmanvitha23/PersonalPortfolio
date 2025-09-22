package com.example.demo.controller;

import com.example.demo.model.Portfolio; // Import the Portfolio class
import com.example.demo.service.PortfolioService; // Import the PortfolioService class
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  // Endpoint to create or update a portfolio
  @PostMapping("/{username}")
  public ResponseEntity<String> createOrUpdatePortfolio(@PathVariable String username,
      @RequestBody Portfolio portfolio) {
    portfolioService.savePortfolio(username, portfolio);
    return ResponseEntity.ok("Portfolio saved successfully!");
  }

  // Endpoint to get a portfolio by username
  @GetMapping("/{username}")
  public ResponseEntity<Portfolio> getPortfolio(@PathVariable String username) {
    Optional<Portfolio> portfolio = portfolioService.getPortfolioByUsername(username);
    return portfolio.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
