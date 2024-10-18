package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Method to find Appointments by userId
    List<Appointment> findByUserId(long userId);
}
