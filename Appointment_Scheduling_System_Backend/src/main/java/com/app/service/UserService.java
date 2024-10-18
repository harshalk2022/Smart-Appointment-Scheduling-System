package com.app.service;

import java.util.List;

import com.app.entity.User;

public interface UserService {

	// Method to save User Details
	User saveUser(User user);

	// Method to fetch All User
	List<User> getAllUsers();

	// Method to fetch User details using Id
	User getUserById(long id);

}
