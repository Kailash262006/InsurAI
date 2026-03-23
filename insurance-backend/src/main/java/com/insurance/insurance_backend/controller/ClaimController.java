package com.insurance.insurance_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.insurance_backend.model.Claim;
import com.insurance.insurance_backend.model.User;
import com.insurance.insurance_backend.repository.ClaimRepository;
import com.insurance.insurance_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private UserRepository userRepository;

    /* ================= CREATE CLAIM ================= */
    @PostMapping
    public Claim createClaim(@RequestBody Map<String, Object> payload) {

        Long userId = Long.valueOf(payload.get("userId").toString());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Claim claim = new Claim();
        claim.setPolicy((String) payload.get("policy"));
        claim.setAmount(Double.parseDouble(payload.get("amount").toString()));
        claim.setReason((String) payload.get("reason"));
        claim.setUser(user); // 🔥 IMPORTANT FIX

        return claimRepository.save(claim);
    }

    /* ================= GET ALL CLAIMS ================= */
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    /* ================= GET USER CLAIMS ================= */
    @GetMapping("/user/{userId}")
    public List<Claim> getUserClaims(@PathVariable Long userId) {
        return claimRepository.findByUserId(userId);
    }

    /* ================= APPROVE CLAIM ================= */
    @PutMapping("/approve/{id}")
    public Claim approveClaim(@PathVariable Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        claim.setStatus("Approved");

        return claimRepository.save(claim);
    }

    /* ================= REJECT CLAIM ================= */
    @PutMapping("/reject/{id}")
    public Claim rejectClaim(@PathVariable Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        claim.setStatus("Rejected");

        return claimRepository.save(claim);
    }
}