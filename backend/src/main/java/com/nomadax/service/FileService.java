package com.nomadax.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    private final Path rootLocation = Paths.get("uploads");

    // Almacena el archivo con un nombre único
    public String storeFile(MultipartFile file, String hotelId) {
        String filename;
        try {
            // Crea el directorio si no existe
            Files.createDirectories(rootLocation);

            // Genera un nombre de archivo único basado en el hotelId y un UUID
            filename = hotelId + "-" + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

            // Resuelve el archivo a la ruta final
            Path destinationFile = rootLocation.resolve(filename).normalize().toAbsolutePath();

            // Guarda el archivo en el sistema de archivos
            file.transferTo(destinationFile);

            // Aquí puedes guardar la información en la base de datos, como el nombre del archivo, la URL, etc.
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el archivo", e);
        }
        return filename;
    }

    // Carga el archivo como un recurso para ser accesible en el frontend
    public Resource loadFileAsResource(String filename) {
        try {
            // Resuelve la ruta del archivo
            Path file = rootLocation.resolve(filename).normalize();

            // Crea un recurso URL para acceder al archivo
            Resource resource = new UrlResource(file.toUri());

            // Verifica si el archivo existe
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("Archivo no encontrado: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error al cargar el archivo", e);
        }
    }
}
