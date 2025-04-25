# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia todos los archivos del proyecto al contenedor
COPY . /app

RUN chmod +x ./mvnw

# skipeo los test
RUN ./mvnw clean install -DskipTests

# Expongo el puerto en el que correrá el back
EXPOSE 8080

# Ejecuta el comando para iniciar la aplicación Java
CMD ["java", "-jar", "target/api.jar"]