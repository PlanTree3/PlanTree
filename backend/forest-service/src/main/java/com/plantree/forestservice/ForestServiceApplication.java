package com.plantree.forestservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableFeignClients
public class ForestServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForestServiceApplication.class, args);
    }

}
