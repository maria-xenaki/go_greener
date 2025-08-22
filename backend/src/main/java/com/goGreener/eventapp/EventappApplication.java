package com.goGreener.eventapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class EventappApplication {

	@Value("${DB_URL:NOT_FOUND}")
	private String dbUrl;

	@Value("${JWT_SECRET:NOT_FOUND}")
	private String jwtSecret;

	@Value("${DB_PASSWORD:}")
	private String dbPassword;

	public static void main(String[] args) {

		//encoded password generator
//		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//		String rawPassword = "";
//		String encodedPassword = encoder.encode(rawPassword);
//		System.out.println("BCrypt hash: " + encodedPassword);

		SpringApplication.run(EventappApplication.class, args);

	}
//		@PostConstruct
//		public void logEnvValues() {
//			System.out.println("🔑 DB_URL = " + dbUrl);
//			System.out.println("🔑 JWT_SECRET = " + jwtSecret);
			//System.out.println("🔑 Encoded DB_PASSWORD = " + encodePassword(dbPassword));
		}

//	@Bean
//	public BCryptPasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	public String encodePassword(String rawPassword) {
//		return passwordEncoder().encode(rawPassword);
//	}

//}
