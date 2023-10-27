package com.ssafy.develog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing
@SpringBootApplication
public class DevelogApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevelogApplication.class, args);
	}

}
