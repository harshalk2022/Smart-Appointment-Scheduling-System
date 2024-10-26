package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequest {
	private Long patientId;
	private Long providerId;
	private String time; // Should be in ISO format like "2024-10-25T10:00:00"

}
