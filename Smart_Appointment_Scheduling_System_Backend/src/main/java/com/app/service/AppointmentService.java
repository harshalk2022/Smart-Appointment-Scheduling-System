package com.app.service;

import com.app.entity.Appointment;
import com.app.entity.User;
import com.app.repository.AppointmentRepository;
import com.app.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {
	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private UserRepository userRepository;

	public Appointment bookAppointment(Long patientId, Long providerId, LocalDateTime time) {
		User patient = userRepository.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
		User provider = userRepository.findById(providerId)
				.orElseThrow(() -> new RuntimeException("Provider not found"));

		Appointment appointment = new Appointment();
		appointment.setPatient(patient);
		appointment.setServiceProvider(provider);
		appointment.setAppointmentTime(time);
		appointment.setStatus("PENDING");

		return appointmentRepository.save(appointment);
	}

	public List<Appointment> getPatientAppointments(Long patientId) {
		User patient = userRepository.findById(patientId).orElseThrow();
		return appointmentRepository.findByPatient(patient);
	}

	public List<Appointment> getProviderAppointments(Long providerId) {
		User provider = userRepository.findById(providerId).orElseThrow();
		return appointmentRepository.findByServiceProvider(provider);
	}

	public Appointment updateAppointmentStatus(Long appointmentId, String status) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));
		appointment.setStatus(status);
		return appointmentRepository.save(appointment);
	}

	public Appointment cancelAppointment(Long appointmentId) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));
		appointment.setStatus("CANCELED");
		return appointmentRepository.save(appointment);
	}
}
