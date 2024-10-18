package com.app.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Appointment_Details")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private long appointmentId;

    @NotNull(message = "user_id can't be empty")
    @Column(name = "user_id", nullable = false)
    private long userId;

    @NotNull(message = "Datetime can't be empty")
    @Column(name = "datetime", nullable = false)
    private LocalDateTime datetime;

    @NotNull(message = "Status can't be empty")
    @Column(name = "status", length = 25, nullable = false)
    private String status;

    // Default Constructor
    public Appointment() {
        super();
    }

    // Parameterized Constructor
    public Appointment(long appointmentId, @NotNull long userId, @NotNull LocalDateTime datetime, @NotNull String status) {
        super();
        this.appointmentId = appointmentId;
        this.userId = userId;
        this.datetime = datetime;
        this.status = status;
    }

    // Getters and Setters
    public long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
