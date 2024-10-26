package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Availability;
import com.app.entity.User;
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

	public List<Availability> getProviderAvailability(Long providerId) {
		User provider = userRepository.findById(providerId).orElseThrow();
		return availabilityRepository.findByServiceProvider(provider);
	}
}
