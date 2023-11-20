package com.ssafy.develog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@EnableJpaAuditing
@SpringBootApplication(
	exclude = {
			org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
			org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
			org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
	}
)
public class DevelogApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevelogApplication.class, args);
	}
}
