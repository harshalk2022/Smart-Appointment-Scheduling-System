package com.app.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AvailabilityRequest;
import com.app.entity.Availability;
import com.app.service.AvailabilityService;

@RestController
@RequestMapping("/availability")
@CrossOrigin(origins = "http://localhost:4200")
public class AvailabilityController {
	@Autowired
	private AvailabilityService availabilityService;

	@PostMapping("/set")
	public ResponseEntity<Availability> setAvailability(@RequestBody AvailabilityRequest availabilityRequest) {
		LocalDateTime availableFrom = LocalDateTime.parse(availabilityRequest.getAvailableFrom());
		LocalDateTime availableTo = LocalDateTime.parse(availabilityRequest.getAvailableTo());
		Availability availability = availabilityService.setAvailability(availabilityRequest.getProviderId(),
				availableFrom, availableTo);
		return ResponseEntity.ok(availability);
	}

	@GetMapping("/provider/{providerId}")
	public ResponseEntity<List<Availability>> getProviderAvailability(@PathVariable Long providerId) {
		List<Availability> availabilities = availabilityService.getProviderAvailability(providerId);
		return ResponseEntity.ok(availabilities);
	}
}
