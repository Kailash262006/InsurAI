package com.insurance.insurance_backend.dto;

public class AIRequest {

    private int age;
    private double income;
    private int familyMembers;
    private boolean existingInsurance;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public int getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(int familyMembers) {
        this.familyMembers = familyMembers;
    }

    public boolean isExistingInsurance() {
        return existingInsurance;
    }

    public void setExistingInsurance(boolean existingInsurance) {
        this.existingInsurance = existingInsurance;
    }
}