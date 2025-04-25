# Usar OpenJDK 17 con Maven
FROM openjdk:17-slim

# Instalar Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo pom.xml para descargar las dependencias
COPY pom.xml .

# Descargar las dependencias de Maven
RUN mvn dependency:go-offline -B

# Copiar todo el código fuente del proyecto
COPY . .

# Convertir archivos a formato Unix (si es necesario)
RUN find . -type f -name "*.properties" -exec dos2unix {} \;

# Ejecutar Maven para empaquetar el proyecto y crear el archivo JAR
RUN mvn clean package -DskipTests

# Exponer el puerto 8080 (puerto por defecto de Spring Boot)
EXPOSE 8080

# Ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "target/nomadax-backend.jar"]
