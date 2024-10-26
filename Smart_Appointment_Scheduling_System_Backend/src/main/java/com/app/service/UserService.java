package com.app.service;

import com.app.entity.User;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public User register(User user) {
		return userRepository.save(user);
	}

	public Optional<User> login(String email, String password) {
		return userRepository.findByEmail(email).filter(user -> user.getPassword().equals(password));
	}

	public Optional<User> findById(Long userId) {
		return userRepository.findById(userId);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}
