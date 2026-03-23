package com.insurance.insurance_backend.dto;

public class FraudRequest {

    private double claimAmount;
    private int policyAgeMonths;
    private int previousClaims;

    public double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public int getPolicyAgeMonths() {
        return policyAgeMonths;
    }

    public void setPolicyAgeMonths(int policyAgeMonths) {
        this.policyAgeMonths = policyAgeMonths;
    }

    public int getPreviousClaims() {
        return previousClaims;
    }

    public void setPreviousClaims(int previousClaims) {
        this.previousClaims = previousClaims;
    }
}