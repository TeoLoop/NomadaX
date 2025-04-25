# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Copia el archivo JAR de tu proyecto Spring Boot (ajusta el nombre del archivo)
COPY target/nomadax-backend.jar /app/nomadax-backend.jar

# Define el directorio de trabajo
WORKDIR /app

# Expón el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "nomadax-backend.jar"]
