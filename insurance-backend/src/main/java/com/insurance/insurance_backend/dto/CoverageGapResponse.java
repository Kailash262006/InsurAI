package com.insurance.insurance_backend.dto;

public class CoverageGapResponse {

    private boolean gapDetected;
    private String message;
    private String recommendation;

    public CoverageGapResponse(boolean gapDetected, String message, String recommendation) {
        this.gapDetected = gapDetected;
        this.message = message;
        this.recommendation = recommendation;
    }

    public boolean isGapDetected() {
        return gapDetected;
    }

    public String getMessage() {
        return message;
    }

    public String getRecommendation() {
        return recommendation;
    }
}