# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Instala Maven en el contenedor
RUN apt-get update && apt-get install -y maven

# Copia todo el proyecto dentro del contenedor
WORKDIR /app
COPY . .

# Compila el proyecto y genera el archivo JAR
RUN mvn clean package

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "target/nomadax-backend.jar"]
