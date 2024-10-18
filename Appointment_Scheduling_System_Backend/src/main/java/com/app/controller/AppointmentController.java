package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Appointment;
import com.app.entity.User;
import com.app.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Saving Appointment details using Post Mapping
    @PostMapping("/appointment")
    public ResponseEntity<Appointment> saveAppointment(@Valid @RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentService.saveAppointment(appointment);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }
    
	// fetching All User details using Get Mapping
	@GetMapping("/appointment")
	public List<Appointment> getAllUser() {
		return appointmentService.getAllAppointments();
	}

    // Get Appointment by appointmentId
    @GetMapping("/appointment/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") long appointmentId) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    // Get Appointments by userId
    @GetMapping("/appointment/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserId(@PathVariable("userId") long userId) {
        List<Appointment> appointments = appointmentService.getAppointmentByUserId(userId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }
}
