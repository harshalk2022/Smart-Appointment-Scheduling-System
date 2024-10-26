package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Availability;
import com.app.entity.User;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

	List<Availability> findByServiceProvider(User serviceProvider);

}
