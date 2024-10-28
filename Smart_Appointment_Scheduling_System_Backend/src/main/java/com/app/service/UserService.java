package com.app.service;

import com.app.entity.User;
import com.app.exeption.UserNotFoundException;
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

	public User getUserById(long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Entered User Id dose not exits" + id));
	}

	public User updateUserById(User user, long id) {
		User newUser = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Entered Todo Id dose not exits" + id));

		// Set new values
		newUser.setName(user.getName());
		newUser.setEmail(user.getEmail());
		newUser.setRole(user.getRole());
		newUser.setDob(user.getDob());
		newUser.setGender(user.getGender());
		newUser.setLocation(user.getLocation());
		newUser.setSpeciality(user.getSpeciality());

		// Saving updated User Details
		userRepository.save(newUser);
		return newUser;
	}

	public void deleteUser(Long id) {
		// TODO Auto-generated method stub

	}

	public void deleteUserById(long id) {
		userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Entered Todo Id dose not exits" + id));
		userRepository.deleteById(id);

	}
}
