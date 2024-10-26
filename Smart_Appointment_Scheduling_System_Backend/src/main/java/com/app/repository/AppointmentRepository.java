package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Appointment;
import com.app.entity.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findByServiceProvider(User serviceProvider);


	List<Appointment> findByPatient(User patient);

}
