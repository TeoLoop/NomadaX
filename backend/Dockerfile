FROM maven:3.8.6-jdk-17

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo pom.xml para descargar las dependencias primero
COPY pom.xml .

# Descargar las dependencias de Maven (esto aprovecha el cache de Docker)
RUN mvn dependency:go-offline -B

# Copiar todo el código fuente del proyecto
COPY . .

# Convertir archivos a formato Unix (si es necesario)
RUN find . -type f -name "*.properties" -exec dos2unix {} \;

# Ejecutar Maven para empaquetar el proyecto y crear el archivo JAR
RUN mvn clean package -DskipTests

# Exponer el puerto 8080 (por defecto de Spring Boot)
EXPOSE 8080

# Ejecutar la aplicación cuando se inicie el contenedor
ENTRYPOINT ["java", "-jar", "target/nomadax-backend.jar"]
