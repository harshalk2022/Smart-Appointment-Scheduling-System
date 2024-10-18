package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Appointment;
import com.app.exception.UserNotFoundException;
import com.app.repository.AppointmentRepository;
import com.app.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Override
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(long appointmentId) {
        return appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new UserNotFoundException("Entered appointment Id does not exist: " + appointmentId));
    }

    @Override
    public List<Appointment> getAppointmentByUserId(long userId) {
        List<Appointment> appointments = appointmentRepository.findByUserId(userId);
        if (appointments.isEmpty()) {
            throw new UserNotFoundException("No appointments found for userId: " + userId);
        }
        return appointments;
    }
}
