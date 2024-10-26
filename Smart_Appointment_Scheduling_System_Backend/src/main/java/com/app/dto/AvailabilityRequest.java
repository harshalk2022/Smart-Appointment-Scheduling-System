package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvailabilityRequest {
	private Long providerId;
	private String availableFrom; // ISO format "2024-10-25T09:00:00"
	private String availableTo; // ISO format "2024-10-25T17:00:00"

}
