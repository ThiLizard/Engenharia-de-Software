package com.software_engineering.EduCare.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.env.Environment;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@Configuration
public class DatabaseInitializerConfig implements BeanFactoryPostProcessor, PriorityOrdered, EnvironmentAware {

    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        createDatabaseIfNotExist();
    }

    private void createDatabaseIfNotExist() {
        try {
            String dbUrl = environment.getProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/educare");
            String username = environment.getProperty("spring.datasource.username", "postgres");
            String password = environment.getProperty("spring.datasource.password", "postgres");

            // Extract the database name and the base URL from the full URL
            // Expected format: jdbc:postgresql://localhost:5432/educare
            int lastSlashIndex = dbUrl.lastIndexOf("/");
            String dbName = dbUrl.substring(lastSlashIndex + 1);
            String baseUrl = dbUrl.substring(0, lastSlashIndex + 1) + "postgres";

            System.out.println("=== Database Initialization ===");
            System.out.println("Checking if database '" + dbName + "' exists...");

            try (Connection conn = DriverManager.getConnection(baseUrl, username, password);
                 Statement stmt = conn.createStatement()) {
                
                // Check if database exists
                ResultSet rs = stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname = '" + dbName + "'");
                if (!rs.next()) {
                    System.out.println("Database '" + dbName + "' does not exist. Creating...");
                    stmt.executeUpdate("CREATE DATABASE " + dbName);
                    System.out.println("Database '" + dbName + "' created successfully!");
                } else {
                    System.out.println("Database '" + dbName + "' already exists.");
                }
                System.out.println("=== Database Initialization Complete ===");
            }
        } catch (Exception e) {
            System.err.println("=== Database Initialization Warning ===");
            System.err.println("Error while checking/creating database: " + e.getMessage());
            System.err.println("Please ensure PostgreSQL is running and credentials are correct.");
            // We don't throw exception here to allow Spring to attempt connection normally 
            // and fail with its own error if it still can't connect.
        }
    }
}
