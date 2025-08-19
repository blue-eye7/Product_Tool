package com.KeySolutions.ProductTool.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KeySolutions.ProductTool.Entity.Category;
import com.KeySolutions.ProductTool.Entity.Products;
import com.KeySolutions.ProductTool.Entity.User;
import com.KeySolutions.ProductTool.Service.ProductService;
import com.KeySolutions.ProductTool.Service.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:5173")
public class Productcontroller {
	
	@Autowired ProductService p_service;
	@Autowired UserService u_service;
	
	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody User u) {
		return u_service.login(u);
	}
	
	@GetMapping("getcat")
	public List<Category> getcat(){
		
		return p_service.getcatagory();
	}
	@GetMapping("getprodbycat")
	public List<Products> getprodbycat(@RequestParam long id){
		return p_service.getprod(id);
	}
	@GetMapping("getprod")
	public Products getprod(@RequestParam long id) {
		return p_service.getproducts(id);
	}
	@PutMapping("updateprod")
	public Products updateprod(@RequestBody Products p) {
		
		return p_service.updateproduct(p);
	}
	@PostMapping("addcat")
	public Category addcat(@RequestParam String  category) {
		return p_service.addcat(category);
	}
	@PostMapping("addprod")
	public Products addprod(@RequestBody Products p,@RequestParam long c_id) {
		return p_service.addprod(p,c_id);
	}

}
