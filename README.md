# 🚀 Microservicio con NestJS + PostgreSQL + Docker

Este proyecto es un microservicio construido con [NestJS](https://nestjs.com/), que utiliza PostgreSQL como base de datos, y Docker para orquestar los servicios de manera sencilla.

---

## 📦 Requisitos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```
2. **Instala las dependencias del proyecto:**
   ```bash
   npm install
   ```
3. **Levanta los servicios con docker:**
   ```bash
   docker compose up
   ```
4. **Aplica las migraciones para crear las tablas:**
   ```bash
   npm run migration:run
   ```
🔐 Rutas de la API para probar
Estas son algunas rutas disponibles que podés testear con Postman, Insomnia o tu frontend:

Registro de usuario:
```bash
POST http://localhost:3000/auth/register
(Agregar más rutas según tu implementación)
```
