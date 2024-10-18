package com.app.service;

import com.app.entity.Auth;

import com.app.entity.Output;

public interface AuthService {

	// Method to validate OTP Details
	Output validateOTP(Auth auth);
}
