FROM maven:3.8-openjdk-17 AS build
WORKDIR /usr/src/app
COPY pom.xml .
COPY src ./src
RUN mvn package

FROM openjdk:21-slim
COPY --from=build target/carauctionsystem-0.0.1-SNAPSHOT.jar carauctionsystem-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","carauctionsystem-0.0.1-SNAPSHOT.jar"]