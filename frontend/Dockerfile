# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto React
COPY . .

# Instala las dependencias de React
RUN npm install

# Expón el puerto 3000
EXPOSE 3000

# Ejecuta la aplicación React
CMD ["npm", "start"]
