package com.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Auth;
import com.app.entity.Output;
import com.app.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
//Rest controller to handle all incoming request using REST API
public class AuthController {

	@Autowired
	private AuthService AuthService;

	// Saving User details using Post Mapping
	@PostMapping("/auth")
	public ResponseEntity<Output> ValidateOtp(@Valid @RequestBody Auth auth) {
		return new ResponseEntity<Output>(AuthService.validateOTP(auth), HttpStatus.CREATED);
	}

}
