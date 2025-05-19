
# NomadaX

NomadaX es una aplicación de reservas tipo Airbnb, enfocada en alojamientos temporales.

## 🛠 Tecnologías utilizadas

- **Backend:** Java + Spring Boot
- **Frontend:** React + Vite
- **Base de datos:** MySQL
- **Otros:** Docker, Docker Compose, Maven, Git

## 📁 Estructura general del proyecto

```
nomadax-app/
├── backend/          # Código del backend (Java + Spring Boot)
├── frontend/         # Código del frontend (React + Vite)
├── docker-compose.yml
├── .gitignore        # Archivos ignorados por Git (Java y Node.js)
└── README.md         # Documentación del proyecto
```

## 🎨 Diseño

🔗 [Ver diseño en Figma](https://www.figma.com/design/eQNXFK8QtEWh2yDpzarhTr/Untitled?node-id=0-1&p=f&t=KlTD4CU5hif43zHF-0)

## ✅ Funcionalidades implementadas

### 🔧 Gestión de Productos (Hoteles)
-CRUD de hoteles desde el panel de administración.

-Subida de múltiples imágenes por producto.

-Detalle completo del producto con galería de imágenes.

-Visualización de características e iconografía asociada.

-Asignación y edición de categorías desde el panel.

-Visualización de políticas del producto.

### 🔎 Búsqueda y Disponibilidad
-Buscador con campos de fecha y ubicación.

-Calendario doble con fechas ocupadas/deshabilitadas.

-Resultados filtrados manteniendo recomendaciones y categorías visibles.

-Filtrado por una o varias categorías con contador.

-Componente de disponibilidad integrado en la ficha del producto.

### 🗓️ Reservas
-Selección de fechas desde el detalle del hotel.

-Validación de rango disponible.

-Redirección a login si el usuario no está autenticado.

-Visualización de datos del usuario y del producto antes de confirmar.

-Página de confirmación tras reservar.

-Manejo de errores y mensajes claros.

-Historial de reservas del usuario autenticado, ordenado por fecha.

### 💖 Favoritos
-Marcado y desmarcado de favoritos con un clic.

-Sección de favoritos accesible desde la cuenta del usuario.

-Actualización en tiempo real al agregar/quitar favoritos.

### 🌟 Puntuaciones
-Puntuar productos con estrellas luego de reservar.

-Sección de valoraciones visibles con comentarios.

-Puntuación media visible en tiempo real.

### 📤 Compartir y Comunicación
-Botón para compartir producto en redes sociales (imagen, descripción y enlace).

-Botón flotante para iniciar conversación por WhatsApp (sin login).

-Compatibilidad con dispositivos móviles y tablets.

### 📧 Confirmaciones por Email
-Envío automático de correo al confirmar reserva.

-Contenido claro con nombre del producto, fechas y datos de contacto.

-Diseño responsive del correo.

### 🔐 Autenticación y Usuarios
-Registro de usuarios con validación de campos.

-Login con mensaje de error si los datos son incorrectos.

-Visualización de avatar y nombre del usuario autenticado.

-Cierre de sesión seguro.

-Panel de administración con gestión de roles (asignar/quitar admin).

### 🧩 Características y Categorías
-Gestión CRUD de características (nombre + ícono).

-Asociación de características a productos.

-Gestión CRUD de categorías (nombre, descripción, imagen).

-Sección de categorías visible en el buscador y en el panel.

### 🖼️ Frontend
-Header fijo, responsive, con logo y botones de login/registro.

-Footer responsivo con logo y derechos.

-Home con secciones:

-Buscador principal

-Categorías con íconos

-Productos recomendados aleatorios (hasta 10)

-Panel de administración accesible solo a usuarios con rol admin y en desktop.

-Formularios de creación y edición en modales.

### ⚙️ Backend
-Estructura modular con entidades, servicios y controladores.

-Endpoints RESTful para hoteles, categorías, usuarios, características y reservas.

-Validaciones de integridad y errores gestionados.

### 🐳 Docker y Entorno de Desarrollo
-Archivo docker-compose.yml para levantar backend, frontend y base de datos.

-Backend en Spring Boot, Frontend en React + Vite, Base de datos en MySQL.

-.gitignore para backend y frontend.

-Proyecto ejecutable con docker-compose up --build.

### 📸 Capturas de Pantalla

1- Página Principal:
![image](https://github.com/user-attachments/assets/e63aad5f-49dd-4b30-91cc-612e149aa9c9)

2- Login
![image](https://github.com/user-attachments/assets/9f53442a-9108-4a8b-b627-e1a70cd9ccbf)

2- Detalle de Producto
![image](https://github.com/user-attachments/assets/cca3611d-cffb-4bce-a6b6-093783793423)
![image](https://github.com/user-attachments/assets/da043aa2-7b47-4665-9c7a-aa5d83d5a5f4)


3- Panel de Administración
![image](https://github.com/user-attachments/assets/61232245-19c3-4a42-8e09-b461b6f6cc4f)

4- Formulario de Creación de Hotel
![image](https://github.com/user-attachments/assets/d627a141-4a04-4992-b9fb-f7d0ebfac81d)

5- Vista Móvil
![image](https://github.com/user-attachments/assets/effa1367-efc6-4502-9791-03f3d6395779)
![image](https://github.com/user-attachments/assets/945b3193-59a9-41bb-96bf-ba39db13bb82)
![image](https://github.com/user-attachments/assets/288cc48e-0481-45a8-8e7d-d3ac0236b2c9)
![image](https://github.com/user-attachments/assets/27197400-1f18-438d-9641-c2a22df15d9c)
![image](https://github.com/user-attachments/assets/e37e903a-0761-41bc-acf5-af7ea960c619)

## 🚀 Cómo ejecutar el proyecto con Docker

### 📦 Requisitos previos

- Tener [Docker](https://www.docker.com/products/docker-desktop/) instalado en tu sistema.

Asegúrate de tener Docker y Docker Compose instalados.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TeoLoop/NomadaX.git
   cd NomadaX
   ```

2. Ejecuta todos los servicios: (en windows asegurarse de tener Docker Desktop abierto)

   ```bash
   docker-compose up --build
   ```

3. Accedé a la app:

   - Frontend (React): [http://localhost:3000](http://localhost:3000)
   - Backend (Spring Boot): [http://localhost:8080](http://localhost:8080)
   - Base de datos MySQL corriendo en el puerto `3306`.

## 🗓 Inicio del Sprint

El desarrollo de NomadaX comenzó el **22 de abril de 2025** como parte del Sprint I del curso.

## 🚧 En desarrollo

Este proyecto forma parte de un Sprint de desarrollo académico por Digital House.
