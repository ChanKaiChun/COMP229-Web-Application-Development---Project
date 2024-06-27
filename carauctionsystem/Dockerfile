FROM maven:3.8-openjdk-17 AS build
WORKDIR /usr/src/app
COPY pom.xml .
COPY src ./src
RUN mvn package

FROM openjdk:21-slim
COPY --from=build target/my-app-1.0.0.jar my-app-1.0.0.jar
ENTRYPOINT ["java","-jar","my-app-1.0.0.jar"]