package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Availability;
import com.app.entity.User;
import com.app.exeption.AvailablityNotFoundException;
import com.app.repository.AvailabilityRepository;
import com.app.repository.UserRepository;

@Service
public class AvailabilityService {

	@Autowired
	private AvailabilityRepository availabilityRepository;

	@Autowired
	private UserRepository userRepository;

	public Availability setAvailability(Long providerId, LocalDateTime from, LocalDateTime to) {
		User provider = userRepository.findById(providerId)
				.orElseThrow(() -> new RuntimeException("Provider not found"));

		Availability availability = new Availability();
		availability.setServiceProvider(provider);
		availability.setAvailableFrom(from);
		availability.setAvailableTo(to);

		return availabilityRepository.save(availability);
	}

//	public List<Availability> getProviderAvailability(Long providerId) {
//		User provider = userRepository.findById(providerId).orElseThrow();
//		return availabilityRepository.findByServiceProvider(provider);
//	}

	public List<Availability> getProviderAvailability(Long providerId) {
		// Log the providerId to verify if it's correctly passed
		System.out.println("Fetching availability for providerId: " + providerId);

		// Check if the provider exists
		User provider = userRepository.findById(providerId)
				.orElseThrow(() -> new RuntimeException("Provider with ID " + providerId + " not found"));

		// Fetch the availability details associated with the provider
		List<Availability> availabilities = availabilityRepository.findByServiceProvider(provider);

		// Log if no availabilities were found
		if (availabilities.isEmpty()) {
			System.out.println("No availabilities found for providerId: " + providerId);
		}

		return availabilities;
	}

//	public Availability updateAvailabilityById(Availability availability, long id) {
//		Availability newAvailability = availabilityRepository.findById(id)
//				.orElseThrow(() -> new AvailablityNotFoundException("Entered Availability Id dose not exits " + id));
//
//		// Set new values
//		newAvailability.setAvailableFrom(availability.getAvailableFrom());
//		newAvailability.setAvailableTo(availability.getAvailableTo());
//
//		// Saving updated Availability Details
//		availabilityRepository.save(newAvailability);
//		return newAvailability;
//
//	}

	public Availability updateAvailabilityById(Availability availability, long id) {
		Availability newAvailability = availabilityRepository.findById(id)
				.orElseThrow(() -> new AvailablityNotFoundException("Entered Availability Id does not exist " + id));

		// Ensure provider is set in case of update
		if (availability.getServiceProvider() != null) {
			newAvailability.setServiceProvider(availability.getServiceProvider());
		}

		// Set new values
		newAvailability.setAvailableFrom(availability.getAvailableFrom());
		newAvailability.setAvailableTo(availability.getAvailableTo());

		// Save updated Availability Details
		return availabilityRepository.save(newAvailability);
	}

	public void deleteAvailabilityById(long id) {
		availabilityRepository.findById(id)
				.orElseThrow(() -> new AvailablityNotFoundException("Entered Availability Id dose not exits " + id));
		availabilityRepository.deleteById(id);
	}
}
