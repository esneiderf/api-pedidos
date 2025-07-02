# API Pedidos - NestJS + TypeORM + MySQL

Este proyecto es una API RESTful desarrollada con **NestJS**, **TypeORM** y **MySQL**. Permite gestionar usuarios, productos, categorías y pedidos, aplicando buenas prácticas y arquitectura modular.

# Tecnologías usadas

- NestJS
- TypeORM
- MySQL
- class-validator & class-transformer
- Postman para pruebas

# Características

- CRUD completo para:
  - Usuarios
  - Productos
  - Categorías
  - Pedidos
- Relaciones:
  - Usuario → Pedidos (1:N)
  - Producto → Categoría (N:1)
  - Pedido ↔ Productos (N:M)
- Validaciones con `class-validator`
- Manejo de errores con `HttpException`
- Separación de módulos, DTOs, entidades y servicios

# Requisitos

- Node.js >= 18
- npm
- MySQL >= 5.7

# Instalación

```bash
git clone https://github.com/tu-usuario/api-pedidos.git
cd api-pedidos
npm install
```

# Configuración de entorno

Crea un archivo `.env` con estas variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_clave
DB_NAME=api_pedidos
```

> También puedes usar el archivo `.env.example` incluido.

# Ejecutar el proyecto

```bash
npm run start:dev
```

NestJS estará disponible en `http://localhost:3000`

# Pruebas en Postman

Se incluye una colección de Postman con las siguientes rutas:

- `/usuarios`
- `/producto`
- `/categoria`
- `/pedido`

Importa el archivo:
```
api-pedidos-nestjs.postman_collection.json
```

# Estructura del proyecto

```
src/
├── app.module.ts
├── main.ts
├── usuario/
├── producto/
├── pedido/
├── categoria/
├── common/
```

# Autor

Esneider Alexander Flórez  
Taller final - API RESTful con NestJS - 2025