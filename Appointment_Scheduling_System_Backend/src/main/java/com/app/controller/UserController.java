package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.User;
import com.app.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
//Rest controller to handle all incoming request using REST API
public class UserController {

	@Autowired
	private UserService userService;

	// Saving User details using Post Mapping
	@PostMapping("/users")
	public ResponseEntity<User> saveUser(@Valid @RequestBody User user) {
		return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
	}

	// fetching All User details using Get Mapping
	@GetMapping("/users")
	public List<User> getAllUser() {
		return userService.getAllUsers();
	}

	// fetching User details by Id using Get Mapping
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") long id) {
		return new ResponseEntity<User>(userService.getUserById(id), HttpStatus.OK);
	}

}
