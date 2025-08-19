package com.KeySolutions.ProductTool.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.KeySolutions.ProductTool.Entity.Products;

@Repository
public interface ProductRepo extends JpaRepository<Products, Long> {

}
