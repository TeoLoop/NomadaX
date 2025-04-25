
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
└── Casos dePrueba US - NomadaX.xlsx         # Excel con casos de prueba (US)
└── Proyecto - NomadaX.pdf         # Documentación del proyecto
└── README.md         # README
```

## 🎨 Diseño

🔗 [Ver diseño en Figma](https://www.figma.com/design/eQNXFK8QtEWh2yDpzarhTr/Untitled?node-id=0-1&p=f&t=KlTD4CU5hif43zHF-0)

## ✅ Funcionalidades implementadas hasta ahora

- Footer y Header responsive.
- Página principal con listado de hoteles.
- Vista detallada de cada hotel.
- Sección de hoteles recomendados aleatorios.
- Panel de administración con:
  - Listado de hoteles.
  - Añadir hotel (modal).
  - Editar hotel (modal).
  - Eliminar hotel.
  - Vista adaptada a escritorio (con advertencia en móviles).
- Estilos globales con variables CSS (`:root`).

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
