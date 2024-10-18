package com.app.service;

import java.util.List;

import com.app.entity.Appointment;
import com.app.entity.User;

public interface AppointmentService {

    // Method to save Appointment Details
    Appointment saveAppointment(Appointment appointment);

    // Method to fetch All Appointments
    List<Appointment> getAllAppointments();

    // Method to fetch Appointment details using appointmentId
    Appointment getAppointmentById(long appointmentId);
    
    // Method to fetch Appointment details using userId
    List<Appointment> getAppointmentByUserId(long userId);

}
