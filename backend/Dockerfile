FROM eclipse-temurin:21.0.10_7-jdk-alpine

WORKDIR /app

COPY target/EduCare-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
