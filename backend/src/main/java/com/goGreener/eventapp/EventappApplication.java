package com.goGreener.eventapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class EventappApplication {

	public static void main(String[] args) {

		//encoded password generator
//		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//		String rawPassword = "";
//		String encodedPassword = encoder.encode(rawPassword);
//		System.out.println("BCrypt hash: " + encodedPassword);

		SpringApplication.run(EventappApplication.class, args);
	}

}
