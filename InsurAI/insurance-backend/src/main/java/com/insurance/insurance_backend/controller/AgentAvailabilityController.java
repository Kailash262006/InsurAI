package com.insurance.insurance_backend.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.insurance_backend.dto.AvailabilityRequest;
import com.insurance.insurance_backend.model.AgentAvailability;
import com.insurance.insurance_backend.model.User;
import com.insurance.insurance_backend.repository.AgentAvailabilityRepository;
import com.insurance.insurance_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/availability")
public class AgentAvailabilityController {

    private final AgentAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    public AgentAvailabilityController(AgentAvailabilityRepository availabilityRepository,
                                       UserRepository userRepository) {
        this.availabilityRepository = availabilityRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public String addAvailability(@RequestBody AvailabilityRequest request) {

        if (request.getAgentId() == null) {
            return "Agent ID is required";
        }

        User agent = userRepository.findById(request.getAgentId())
                .orElse(null);

        if (agent == null) {
            return "Agent not found";
        }

        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime start = LocalTime.parse(request.getStartTime());
        LocalTime end = LocalTime.parse(request.getEndTime());

        if (availabilityRepository.hasOverlappingSlot(agent, date, start, end)) {
            return "Availability slot overlaps with existing slot";
        }

        AgentAvailability availability = new AgentAvailability();
        availability.setAgent(agent);
        availability.setAvailableDate(date);
        availability.setStartTime(start);
        availability.setEndTime(end);

        availabilityRepository.save(availability);

        return "Availability added successfully";
    }




    @GetMapping("/all")
    public List<AgentAvailability> getAllAvailability() {
        return availabilityRepository.findAll();
    }
}
