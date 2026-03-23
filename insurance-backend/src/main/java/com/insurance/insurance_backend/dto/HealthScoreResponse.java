package com.insurance.insurance_backend.dto;

public class HealthScoreResponse {

    private int score;
    private String status;
    private String recommendation;

    public HealthScoreResponse(int score, String status, String recommendation) {
        this.score = score;
        this.status = status;
        this.recommendation = recommendation;
    }

    public int getScore() {
        return score;
    }

    public String getStatus() {
        return status;
    }

    public String getRecommendation() {
        return recommendation;
    }
}