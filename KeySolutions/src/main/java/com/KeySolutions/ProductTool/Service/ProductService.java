package com.KeySolutions.ProductTool.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.KeySolutions.ProductTool.Entity.Category;
import com.KeySolutions.ProductTool.Entity.Products;
import com.KeySolutions.ProductTool.Repository.CategoryRepo;
import com.KeySolutions.ProductTool.Repository.ProductRepo;

@Service
public class ProductService {

	
	@Autowired CategoryRepo c_repo;
	
	@Autowired ProductRepo p_repo;

	public List<Category> getcatagory() {
		
		
		return c_repo.findAll();
	}

	public List<Products> getprod(long id) {
		Category c=c_repo.findById(id).orElse(null);
		List<Products> p=c.getProducts();
		System.out.println(p);
		return p;
	}

	public Products getproducts(long id) {
		
		return p_repo.findById(id).orElse(null);
	}

	public Products updateproduct(Products p) {
		Products existing=p_repo.findById(p.getId()).orElse(null);
		existing.setAtrributes(p.getAtrributes());
		existing.setP_name(p.getP_name());
		existing.setPrice(p.getPrice());
		existing.setStocks(p.getStocks());
		
		return p_repo.save(existing);
	}

	public Category addcat(String category) {
		Category c=new Category();
		c.setCategory(category);
		
		return c_repo.save(c);
	}

	public Products addprod(Products p, long c_id) {
		
		Category c=c_repo.findById(c_id).orElse(null);
		p.setCategory(c);
		c.getProducts().add(p);
		c_repo.save(c);
		
		return p;
	}
	
	
	
	
}
