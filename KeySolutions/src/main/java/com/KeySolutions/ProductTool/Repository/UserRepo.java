package com.KeySolutions.ProductTool.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.KeySolutions.ProductTool.Entity.User;
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findByUsername(String username);

}
