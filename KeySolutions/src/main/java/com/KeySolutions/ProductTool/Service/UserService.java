package com.KeySolutions.ProductTool.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.KeySolutions.ProductTool.Entity.User;
import com.KeySolutions.ProductTool.Repository.UserRepo;

@Service
public class UserService {
	
@Autowired UserRepo u_repo;
	public ResponseEntity<?> login(User u) {
		User user=u_repo.findByUsername(u.getUsername());
		if(user!=null) {
			if(user.getPassword().equals(u.getPassword())) {
				if(user.getRole().equals("admin")) {
					return ResponseEntity.ok(user);
				}
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed");
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("wrong password");
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username not found");
	}

}
