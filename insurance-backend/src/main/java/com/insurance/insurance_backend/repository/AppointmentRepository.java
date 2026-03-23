package com.insurance.insurance_backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.insurance.insurance_backend.model.Appointment;
import com.insurance.insurance_backend.model.User;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    // ✅ DOUBLE BOOKING CHECK
    @Query(
        "SELECT COUNT(a) > 0 FROM Appointment a " +
        "WHERE a.agent = :agent " +
        "AND a.appointmentDate = :date " +
        "AND a.startTime < :endTime " +
        "AND a.endTime > :startTime"
    )
    boolean existsOverlappingAppointment(
            @Param("agent") User agent,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    List<Appointment> findByUser(User user);

    List<Appointment> findByAgent(User agent);
    List<Appointment> findByAgentAndAppointmentDate(
            User agent,
            LocalDate appointmentDate
    );
    long countByUser(User user);
    long countByUserAndStatus(User user, String status);
    long countByUserAndStatusAndAppointmentDateGreaterThanEqual(
        User user,
        String status,
        LocalDate date
);  
}
