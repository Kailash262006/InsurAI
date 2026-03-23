package com.insurance.insurance_backend.dto;

public class RiskResponse {

    private final int score;
    private final String message;

    public RiskResponse(int score, String message) {
        this.score = score;
        this.message = message;
    }

    public int getScore() {
        return score;
    }

    public String getMessage() {
        return message;
    }
}