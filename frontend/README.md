# NomadaX - Frontend

Este es el frontend de la aplicación **NomadaX**, creado con **React** y **Vite**. La aplicación permite a los usuarios visualizar y reservar hoteles de manera fácil e intuitiva.

## 🛠 Tecnologías utilizadas

- **React** (Biblioteca de JavaScript para construir interfaces de usuario)
- **Vite** (Herramienta de construcción y servidor de desarrollo)
- **React Router** (Para manejar rutas y navegación)
- **react-icons** (Iconos para la UI)
- **sweetalert2** (Para mostrar alertas y notificaciones)


## 🚀 Cómo ejecutar el frontend

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/TeoLoop/NomadaX.git
    cd NomadaX/frontend
    ```

2. Instalar dependencias:
    ```bash
    npm install
    ```

3. Ejecutar el proyecto en modo de desarrollo:
    ```bash
    npm run dev
    ```

4. Acceder a la aplicación en el navegador en `http://localhost:5173`. Por defecto de vite

## 🔄 Funcionalidades del Frontend

- **Visualización de hoteles**: Se muestra la lista de hoteles disponibles con detalles.
- **Detalle de hotel**: Al hacer clic en un hotel, el usuario es llevado a una página con más detalles sobre ese hotel.
- **Recomendaciones aleatorias**: En la página principal, se muestran recomendaciones aleatorias de hoteles.
- **Panel de administración (excluido en la vista móvil)**: Solo accesible para administradores, permite añadir, editar y eliminar hoteles.

## 🧑‍💻 Buenas prácticas de desarrollo

- Utilización de **componentes reutilizables** en lugar de código repetido.
- Manejo del estado con **useState** y **useEffect**.
- Uso de **modales** para la edición y eliminación de hoteles.
- **React Router** para la navegación entre páginas.

## 📄 Notas de desarrollo

- Las **peticiones al backend** se realizan mediante funciones en el archivo `services/hotelService.js`.
