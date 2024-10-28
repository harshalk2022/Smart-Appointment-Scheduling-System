package com.app.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AvailablityNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public AvailablityNotFoundException(String message) {
		super(message);
	}
}
