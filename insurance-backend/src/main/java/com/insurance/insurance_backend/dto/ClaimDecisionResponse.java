package com.insurance.insurance_backend.dto;

public class ClaimDecisionResponse {

    private String decision;
    private int confidence;
    private String reason;

    public ClaimDecisionResponse(String decision, int confidence, String reason) {
        this.decision = decision;
        this.confidence = confidence;
        this.reason = reason;
    }

    public String getDecision() {
        return decision;
    }

    public int getConfidence() {
        return confidence;
    }

    public String getReason() {
        return reason;
    }
}