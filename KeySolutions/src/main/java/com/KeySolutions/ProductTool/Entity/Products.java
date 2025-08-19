package com.KeySolutions.ProductTool.Entity;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import lombok.Data;

@Entity


public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String p_name;
	
	@ElementCollection
    @CollectionTable(name = "product_attributes", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "attribute_key")
    @Column(name = "attribute_value")
	private Map<String,String> atrributes;
	
	private double price;
	
	private int stocks;
	
	  @ManyToOne
	  @JoinColumn(name = "category_id")
	  @JsonIgnore
	  private Category category;

	  public long getId() {
		  return id;
	  }

	  public void setId(long id) {
		  this.id = id;
	  }

	  public String getP_name() {
		  return p_name;
	  }

	  public void setP_name(String p_name) {
		  this.p_name = p_name;
	  }

	  public Map<String, String> getAtrributes() {
		  return atrributes;
	  }

	  public void setAtrributes(Map<String, String> atrributes) {
		  this.atrributes = atrributes;
	  }

	  public double getPrice() {
		  return price;
	  }

	  public void setPrice(double price) {
		  this.price = price;
	  }

	  public int getStocks() {
		  return stocks;
	  }

	  public void setStocks(int stocks) {
		  this.stocks = stocks;
	  }

	  public Category getCategory() {
		  return category;
	  }

	  public void setCategory(Category category) {
		  this.category = category;
	  }
	  
	  
}
