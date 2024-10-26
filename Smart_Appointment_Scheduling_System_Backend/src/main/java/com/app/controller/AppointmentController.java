package com.app.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentRequest;
import com.app.entity.Appointment;
import com.app.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;

	@PostMapping("/book") // Remove password from response
	public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest appointmentRequest) {
		LocalDateTime appointmentTime = LocalDateTime.parse(appointmentRequest.getTime());
		Appointment appointment = appointmentService.bookAppointment(appointmentRequest.getPatientId(),
				appointmentRequest.getProviderId(), appointmentTime);
		return ResponseEntity.ok(appointment);
	}

	@GetMapping("/patient/{patientId}") 
	public ResponseEntity<List<Appointment>> getPatientAppointments(@PathVariable Long patientId) {
		List<Appointment> appointments = appointmentService.getPatientAppointments(patientId);
		return ResponseEntity.ok(appointments);
	}

	@GetMapping("/provider/{providerId}")
	public ResponseEntity<List<Appointment>> getProviderAppointments(@PathVariable Long providerId) {
		List<Appointment> appointments = appointmentService.getProviderAppointments(providerId);
		return ResponseEntity.ok(appointments);
	}

	@PostMapping("/updateStatus/{appointmentId}")
	public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable Long appointmentId,
			@RequestParam String status) {
		Appointment appointment = appointmentService.updateAppointmentStatus(appointmentId, status);
		return ResponseEntity.ok(appointment);
	}

	@PostMapping("/cancel/{appointmentId}")
	public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long appointmentId) {
		Appointment appointment = appointmentService.cancelAppointment(appointmentId);
		return ResponseEntity.ok(appointment);
	}
}
