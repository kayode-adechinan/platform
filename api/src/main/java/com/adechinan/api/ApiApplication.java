package com.adechinan.api;

import com.adechinan.api.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.Stream;


/*
Norma is Data analytics tool, that help you in addition to manage efficiently your data
(reservation system, ticketing system, order system ) runs pools, make prediction,
get insights, run simulations (montecarlo), make comparison to get the best provider
 */


@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	CommandLineRunner runner (ProductRepository productRepository,
							  StorageService storageService){
		return args -> {
			LongStream.range(1, 10).forEach(i -> productRepository.save(new Product( "product"+i, "http://placehold.it/200x100")));

			storageService.deleteAll();
			storageService.init();

		};
	}

}
