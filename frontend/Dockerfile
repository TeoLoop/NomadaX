# Usa una imagen base de Node.js 18
FROM node:18


WORKDIR /app

# Copia los archivos del proyecto React
COPY . .


RUN npm install --legacy-peer-deps

# Expón el puerto 3000
EXPOSE 3000


CMD ["npm", "run", "dev"]
