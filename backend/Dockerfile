# Etapa 1: Construcción del archivo JAR con Maven
FROM maven:3.8.6-openjdk-17-slim AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios para las dependencias
COPY pom.xml .

# Descargar las dependencias de Maven (esto se hace por separado para aprovechar el cache de Docker)
RUN mvn dependency:go-offline -B

# Copiar el resto del código fuente
COPY . .

# Convertir archivos a formato Unix (si es necesario)
RUN find . -type f -name "*.properties" -exec dos2unix {} \;

# Ejecutar Maven para empaquetar el proyecto en un archivo JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen de ejecución más ligera
FROM openjdk:17-jdk-slim

# Crear un usuario no root para ejecutar la aplicación
RUN adduser --disabled-password --gecos '' appuser

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR desde la etapa de construcción
COPY --from=build /app/target/nomadax-backend.jar /app/nomadax-backend.jar

# Cambiar la propiedad del archivo JAR a appuser para mayor seguridad
RUN chown appuser:appuser /app/nomadax-backend.jar

# Exponer el puerto 8080 (puerto por defecto de Spring Boot)
EXPOSE 8080

# Cambiar al usuario no root
USER appuser

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "nomadax-backend.jar"]
