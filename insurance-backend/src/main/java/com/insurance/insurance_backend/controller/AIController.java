package com.insurance.insurance_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.insurance_backend.dto.AIRequest;
import com.insurance.insurance_backend.dto.AIResponse;
import com.insurance.insurance_backend.dto.ClaimDecisionResponse;
import com.insurance.insurance_backend.dto.CoverageGapResponse;
import com.insurance.insurance_backend.dto.FraudRequest;
import com.insurance.insurance_backend.dto.FraudResponse;
import com.insurance.insurance_backend.dto.HealthScoreResponse;
import com.insurance.insurance_backend.dto.RiskRequest;
import com.insurance.insurance_backend.dto.RiskResponse;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @PostMapping("/recommend-policy")
    public AIResponse recommendPolicy(@RequestBody AIRequest request) {

        int age = request.getAge();
        int family = request.getFamilyMembers();
        double income = request.getIncome();

        // Simple AI Rule Engine

        if (age > 40) {
            return new AIResponse(
                    "Health Secure Plus",
                    "₹15,00,000",
                    "₹12,500/year",
                    "Recommended because health risk increases after age 40"
            );
        }

        if (family >= 3) {
            return new AIResponse(
                    "Family Health Shield",
                    "₹12,00,000",
                    "₹11,000/year",
                    "Recommended for family protection coverage"
            );
        }

        if (income > 1000000) {
            return new AIResponse(
                    "Premium Life Shield",
                    "₹25,00,000",
                    "₹18,000/year",
                    "Recommended based on high income bracket"
            );
        }

        return new AIResponse(
                "Basic Health Plan",
                "₹5,00,000",
                "₹6,000/year",
                "Basic protection recommended"
        );
    }

    @PostMapping("/risk-score")
    public RiskResponse calculateRisk(@RequestBody RiskRequest request) {

        int risk = 0;

        if (request.getAge() > 40)
            risk += 20;

        if (request.getFamilyMembers() > 3)
            risk += 15;

        if (request.getIncome() < 500000)
            risk += 20;

        if (!request.isExistingInsurance())
            risk += 25;

        int score = 100 - risk;

        String message;

        if (score > 80)
            message = "Low insurance risk. Your coverage looks good.";
        else if (score > 60)
            message = "Moderate risk detected. Consider increasing coverage.";
        else
            message = "High risk detected. Insurance protection is recommended.";

        return new RiskResponse(score, message);
    }

    @PostMapping("/fraud-check")
    public FraudResponse detectFraud(@RequestBody FraudRequest request) {

        int risk = 0;

        if (request.getClaimAmount() > 500000)
            risk += 40;

        if (request.getPolicyAgeMonths() < 3)
            risk += 30;

        if (request.getPreviousClaims() > 2)
            risk += 30;

        String level;
        String message;

        if (risk > 70) {
            level = "HIGH";
            message = "Potential fraud detected. Manual verification recommended.";
        }
        else if (risk > 40) {
            level = "MEDIUM";
            message = "Moderate fraud risk detected.";
        }
        else {
            level = "LOW";
            message = "Claim appears legitimate.";
        }

        return new FraudResponse(risk, level, message);
    }

    @PostMapping("/claim-decision")
    public ClaimDecisionResponse predictClaimDecision(@RequestBody FraudRequest request) {

        int score = 0;

        if (request.getClaimAmount() < 200000)
            score += 40;

        if (request.getPolicyAgeMonths() > 6)
            score += 30;

        if (request.getPreviousClaims() <= 1)
            score += 30;

        String decision;
        String reason;

        if (score >= 70) {
            decision = "APPROVED";
            reason = "Low fraud risk and healthy policy history.";
        } else {
            decision = "MANUAL REVIEW";
            reason = "Claim requires manual verification.";
        }

        return new ClaimDecisionResponse(decision, score, reason);
    }
 
    @PostMapping("/coverage-gap")
    public CoverageGapResponse detectCoverageGap(@RequestBody AIRequest request) {

        double income = request.getIncome();
        int family = request.getFamilyMembers();

        double recommendedCoverage = income * 10;

        if (family >= 3) {
            recommendedCoverage = income * 12;
        }

        if (recommendedCoverage > 1000000) {
            return new CoverageGapResponse(
                    true,
                    "Coverage gap detected based on your income and family size.",
                    "Upgrade to Health Secure Plus with ₹15,00,000 coverage"
            );
        }

        return new CoverageGapResponse(
                false,
                "Your insurance coverage looks sufficient.",
                "No upgrade required"
        );
    }

    @PostMapping("/health-score")
    public HealthScoreResponse calculateHealthScore(@RequestBody AIRequest request) {

        int score = 100;

        if (request.getAge() > 45)
            score -= 20;

        if (request.getFamilyMembers() >= 4)
            score -= 15;

        if (!request.isExistingInsurance())
            score -= 30;

        if (request.getIncome() < 500000)
            score -= 10;

        String status;
        String recommendation;

        if (score > 80) {
            status = "Excellent Protection";
            recommendation = "Your insurance coverage looks strong.";
        }
        else if (score > 60) {
            status = "Moderate Protection";
            recommendation = "Consider increasing your health insurance coverage.";
        }
        else {
            status = "Low Protection";
            recommendation = "Immediate insurance upgrade recommended.";
        }

        return new HealthScoreResponse(score, status, recommendation);
    }
}