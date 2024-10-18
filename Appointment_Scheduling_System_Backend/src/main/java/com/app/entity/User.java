package com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "User_Details")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long userId;

	@Column(name = "user_name", length = 50, nullable = false)
	@NotBlank(message = "User_Name can't be empty")
	private String userName;

	@Column(name = "email", length = 50)
	@NotBlank(message = "Email can't be empty")
	private String userEmail;

	@Column(name = "password", length = 25, nullable = false)
	@NotBlank(message = "Password can't be empty")
	private String userPassword;

	@Column(name = "mobile_number", length = 12, nullable = false)
	@NotNull(message = "Mobile Number can't be empty")
	private long number;

	// Constructor
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String userName, String userEmail, String userPassword, long number) {
		super();
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.number = number;
	}

	// Getters and Setters
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

}
