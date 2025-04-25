# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalamos el paquete `dos2unix` para manejar problemas de codificación de archivos de texto
RUN apt-get update && apt-get install -y dos2unix

# Convertir todos los archivos .properties a formato UNIX (para evitar problemas de saltos de línea)
RUN find . -type f -name "*.properties" -exec dos2unix {} \;

# Ejecutar Maven para empaquetar la aplicación
RUN ./mvnw clean package -DskipTests

# Copiar el archivo JAR generado en el contenedor
COPY target/nomadax-backend.jar /app/nomadax-backend.jar

# Exponer el puerto donde se ejecuta el backend
EXPOSE 8080

# Definir el comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "nomadax-backend.jar"]
