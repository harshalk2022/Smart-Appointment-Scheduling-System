package com.app.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	@PostMapping("/provider")
	public ResponseEntity<Availability> setAvailability(@RequestBody AvailabilityRequest availabilityRequest) {
		LocalDateTime availableFrom = LocalDateTime.parse(availabilityRequest.getAvailableFrom());
		LocalDateTime availableTo = LocalDateTime.parse(availabilityRequest.getAvailableTo());
		Availability availability = availabilityService.setAvailability(availabilityRequest.getProviderId(),
				availableFrom, availableTo);
		return ResponseEntity.ok(availability);
	}

//	@GetMapping("/provider/{providerId}")
//	public ResponseEntity<List<Availability>> getProviderAvailability(@PathVariable Long providerId) {
//		List<Availability> availabilities = availabilityService.getProviderAvailability(providerId);
//		return ResponseEntity.ok(availabilities);
//	}

	@GetMapping("/provider/{providerId}")
	public ResponseEntity<?> getProviderAvailability(@PathVariable Long providerId) {
		try {
			List<Availability> availabilities = availabilityService.getProviderAvailability(providerId);
			return ResponseEntity.ok(availabilities);
		} catch (RuntimeException e) {
			// Log and return a 404 or 500 status if provider not found or another issue
			// occurs
			System.err.println("Error fetching availability for providerId " + providerId + ": " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error fetching availability details: " + e.getMessage());
		}
	}

	// Updating Availability details by id using put mapping
	@PutMapping("/provider/{id}")
	public ResponseEntity<Availability> updateAvailability(@PathVariable("id") long id,
			@RequestBody Availability Availability) {
		return new ResponseEntity<Availability>(availabilityService.updateAvailabilityById(Availability, id),
				HttpStatus.OK);
	}

	// Deleting Availability details by id using Delete Mapping
	@DeleteMapping("/provider/{id}")
	public ResponseEntity<String> deleteAvailability(@PathVariable Long id) {
		availabilityService.deleteAvailabilityById(id);
		return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
	}
}
