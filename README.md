# Frontend Vite App - MCGA

## Descripción
Este proyecto es una aplicación web full stack compuesta por un frontend desarrollado en React (usando Vite) y un backend utilizando Node.js y Express, con base de datos MongoDB en la nube. El objetivo es gestionar usuarios y datos, implementando autenticación segura mediante JWT y funcionalidades completas de CRUD (Crear, Leer, Actualizar y Eliminar) que impactan sobre la visualización pública de datos.

Tecnologías y Herramientas Utilizadas
Frontend:

React (Vite)

React Router DOM para el manejo de rutas

Flexbox para maquetado

Validación de formularios recomendada con Joi, React Hook Form

Firebase (opcional para autenticación/JWT)

Despliegue recomendado en Vercel

Backend:

Node.js y Express

MongoDB Atlas

Mongoose para modelado de datos

JWT (jsonwebtoken) para autenticación segura

Joi para validación de datos del lado del backend

CORS, dotenv


## Instalación
## Modificaciones recientes

- Implementación de rutas privadas y públicas para restringir el acceso según sesión activa.
- Agregado modal de confirmación para todas las operaciones de borrado en las listas.
- Validaciones simples de formularios en las pantallas de alta y edición.
- Botón de logout y gestión del token JWT en localStorage.
