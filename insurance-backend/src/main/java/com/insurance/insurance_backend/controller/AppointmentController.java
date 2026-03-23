package com.insurance.insurance_backend.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.insurance_backend.dto.AppointmentRequest;
import com.insurance.insurance_backend.model.AgentAvailability;
import com.insurance.insurance_backend.model.Appointment;
import com.insurance.insurance_backend.model.User;
import com.insurance.insurance_backend.repository.AgentAvailabilityRepository;
import com.insurance.insurance_backend.repository.AppointmentRepository;
import com.insurance.insurance_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final AgentAvailabilityRepository availabilityRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
                                UserRepository userRepository,
                                AgentAvailabilityRepository availabilityRepository) {

        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.availabilityRepository = availabilityRepository;
    }

    @PostMapping("/book")
    public String bookAppointment(@RequestBody AppointmentRequest request) {

        User user = userRepository.findById(request.getUserId()).orElse(null);
        User agent = userRepository.findById(request.getAgentId()).orElse(null);

        if (user == null || agent == null) {
            return "User or Agent not found";
        }

        // Parse date and time FIRST
    LocalDate date = LocalDate.parse(request.getDate());
    LocalTime start = LocalTime.parse(request.getStartTime());
    LocalTime end = LocalTime.parse(request.getEndTime());

    // ⭐ Prevent booking near-future slots (15 min rule)
    if (date.equals(LocalDate.now())) {

        LocalTime nowPlus15 = LocalTime.now().plusMinutes(15);

        if (start.isBefore(nowPlus15)) {
            return "This slot is too close to current time. Please choose a later slot.";
        }
    }    
    
    // 🔴 CHECK DOUBLE BOOKING HERE
    if (appointmentRepository.existsOverlappingAppointment(
            agent, date, start, end)) {
        return "Agent already booked for this time slot";
    }

    // Create appointment ONLY if slot is free
    Appointment appointment = new Appointment();
    appointment.setUser(user);
    appointment.setAgent(agent);
    appointment.setAppointmentDate(date);
    appointment.setStartTime(start);
    appointment.setEndTime(end);
    appointment.setStatus("BOOKED");

    appointmentRepository.save(appointment);

    return "Appointment booked successfully";
}
@GetMapping("/user/{userId}")
public List<Appointment> getUserAppointments(@PathVariable Long userId) {

    User user = userRepository.findById(userId).orElse(null);

    if (user == null) {
        return List.of();
    }

    return appointmentRepository.findByUser(user);
}
@GetMapping("/agent/{agentId}")
public List<Appointment> getAgentAppointments(@PathVariable Long agentId) {

    User agent = userRepository.findById(agentId).orElse(null);

    if (agent == null) {
        return List.of();
    }

    return appointmentRepository.findByAgent(agent);
}
@PutMapping("/cancel/{appointmentId}")
public String cancelAppointment(@PathVariable Long appointmentId) {

    Appointment appointment =
            appointmentRepository.findById(appointmentId).orElse(null);

    if (appointment == null) {
        return "Appointment not found";
    }

    appointment.setStatus("CANCELLED");
    appointmentRepository.save(appointment);

    return "Appointment cancelled successfully";
}
@PutMapping("/complete/{appointmentId}")
public String completeAppointment(@PathVariable Long appointmentId) {

    Appointment appointment =
            appointmentRepository.findById(appointmentId).orElse(null);

    if (appointment == null) {
        return "Appointment not found";
    }

    appointment.setStatus("COMPLETED");
    appointmentRepository.save(appointment);

    return "Appointment marked as completed";
}
@GetMapping("/slots/{agentId}/{date}")
public List<String> getAvailableSlots(
        @PathVariable Long agentId,
        @PathVariable String date) {

    User agent = userRepository.findById(agentId).orElse(null);
    if (agent == null) return List.of();

    LocalDate selectedDate = LocalDate.parse(date);

    // ✅ GET AGENT AVAILABILITY
    List<AgentAvailability> availabilityList =
            availabilityRepository.findByAgentAndAvailableDate(
                    agent,
                    selectedDate);

    List<Appointment> booked =
            appointmentRepository.findByAgentAndAppointmentDate(
                    agent, selectedDate);

    List<String> slots = new ArrayList<>();

    for (AgentAvailability availability : availabilityList) {

        LocalTime current = availability.getStartTime();
        LocalTime availabilityEnd = availability.getEndTime();

        int safety = 0;

        while (
            !current.plusMinutes(30).isAfter(availabilityEnd)
            && current.isBefore(LocalTime.MAX)   // ⭐ stop midnight overflow
            && safety < 100
        ) {

            LocalTime slotEnd = current.plusMinutes(30);

            // 🚫 prevent crossing next day
            if (slotEnd.isBefore(current)) break;

            LocalTime checkTime = current;

            boolean isBooked = booked.stream().anyMatch(a ->
                    a.getStartTime().equals(checkTime));

            if (!isBooked) {
                slots.add(current + " - " + slotEnd);
            }

            current = slotEnd;
            safety++;
        }
    }

    return slots;
}

@GetMapping("/stats/{userId}")
public Map<String, Long> getUserStats(@PathVariable Long userId) {

    User user = userRepository.findById(userId).orElse(null);

    if (user == null) {
        return Map.of(
            "total", 0L,
            "completed", 0L,
            "upcoming", 0L
        );
    }

    List<Appointment> appointments =
            appointmentRepository.findByUser(user);

    long total = appointments.size();

    long completed = appointments.stream()
            .filter(a -> "COMPLETED".equals(a.getStatus()))
            .count();

    long upcoming = appointments.stream()
            .filter(a -> "BOOKED".equals(a.getStatus()))
            .count();

    return Map.of(
            "total", total,
            "completed", completed,
            "upcoming", upcoming
    );
}

}
