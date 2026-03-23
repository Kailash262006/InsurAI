package com.insurance.insurance_backend.dto;

public class AIResponse {

    private final String policy;
    private final String coverage;
    private final String premium;
    private final String reason;

    public AIResponse(String policy, String coverage, String premium, String reason) {
        this.policy = policy;
        this.coverage = coverage;
        this.premium = premium;
        this.reason = reason;
    }

    public String getPolicy() {
        return policy;
    }

    public String getCoverage() {
        return coverage;
    }

    public String getPremium() {
        return premium;
    }

    public String getReason() {
        return reason;
    }
}