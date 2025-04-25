# Etapa 1: Construcción del archivo JAR con Maven
FROM maven:3.8.6-openjdk-17-slim AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el código fuente al contenedor
COPY . .

# Ejecutar Maven para compilar el proyecto y empaquetarlo en un archivo JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final para ejecutar la aplicación
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo JAR desde la etapa de construcción
COPY --from=build /app/target/nomadax-backend.jar /app/nomadax-backend.jar

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 8080

# Ejecutar el archivo JAR de Spring Boot
ENTRYPOINT ["java", "-jar", "nomadax-backend.jar"]
