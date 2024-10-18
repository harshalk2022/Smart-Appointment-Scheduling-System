package com.app.serviceImpl;
import org.springframework.stereotype.Service;
import com.app.entity.Auth;
import com.app.entity.Output;
import com.app.service.AuthService;

@Service
//Implement all CRUD methods, all business logic
public class AuthServiceImpl implements AuthService {
	private String defaultOTP = "000000";

	@Override
	public Output validateOTP(Auth auth) {
		Output output = new Output();
		if (defaultOTP.equalsIgnoreCase(auth.getOtp())) {
			output.setMessage("success");
			return output;

		} else {
			output.setMessage("failure");
			return output;
		}
	}

}
