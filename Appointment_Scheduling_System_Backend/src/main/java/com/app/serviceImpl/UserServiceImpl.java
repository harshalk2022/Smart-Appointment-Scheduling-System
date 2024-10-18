package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.User;
import com.app.exception.UserNotFoundException;
import com.app.repository.UserRepository;
import com.app.service.UserService;

@Service
//Implement all CRUD methods, all business logic
public class UserServiceImpl implements UserService {
 
	@Autowired
	UserRepository userRepository;
	
	@Override
	// Saving user details into table using save() of JPA Repository
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	// fetching all users from table
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	// fetching user details from table based on id, if not found then throw Exception
	public User getUserById(long id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Entered User Id dose not exits" + id));
	}


}
