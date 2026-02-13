package com.insurance.insurance_backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.insurance.insurance_backend.model.AgentAvailability;
import com.insurance.insurance_backend.model.User;

public interface AgentAvailabilityRepository
        extends JpaRepository<AgentAvailability, Long> {

    @Query(
        "SELECT COUNT(a) > 0 FROM AgentAvailability a " +
        "WHERE a.agent = :agent " +
        "AND a.availableDate = :date " +
        "AND a.startTime < :endTime " +
        "AND a.endTime > :startTime"
    )
    boolean hasOverlappingSlot(
            @Param("agent") User agent,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );
}
