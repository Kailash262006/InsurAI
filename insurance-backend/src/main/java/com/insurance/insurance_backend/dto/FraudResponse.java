package com.insurance.insurance_backend.dto;

public class FraudResponse {

    private int riskScore;
    private String riskLevel;
    private String message;

    public FraudResponse(int riskScore, String riskLevel, String message) {
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
        this.message = message;
    }

    public int getRiskScore() {
        return riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public String getMessage() {
        return message;
    }
}