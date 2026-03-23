package com.insurance.insurance_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.insurance.insurance_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // ✅ Fetch all AGENT users
    @Query("""
        SELECT u FROM User u
        JOIN u.roles r
        WHERE r.name = 'AGENT'
    """)
    List<User> findAllAgents();
}