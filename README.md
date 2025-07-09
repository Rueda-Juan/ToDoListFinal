# 📝 To-Do List para Usuarios
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-5.x-lightgrey?logo=express) ![Vite](https://img.shields.io/badge/Vite-7.x-purple?logo=vite) ![React](https://img.shields.io/badge/React-18.x-blue?logo=react) ![SQLite](https://img.shields.io/badge/SQLite-3.x-lightblue?logo=sqlite) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)

  Proyecto Final del Curso de FullStack proporcionado por "Cilsa".
  Esta Pagina Web es una  **To-Do-List (Lista de Tareas)** en el cual permite a a los usuarios **registrar, iniciar sesion y gestionar sus tareas** de forma intuitiva, sencilla y organizada  

## 📌 Objetivo
  El objetivo de esta aplicación es brindar una herramienta simple, funcional e intuitiva para que cada usuario pueda registrarse y administrar sus propias tareas

## ✨Caracteristicas
  - ➕ Registo y Login de usuario
  - ➕ Crear tareas personalizadas por el usuario
  - 📦 Visualizar todas las tareas
  - ✔️ Marcar tareas como "Completadas"
  - ✏️ Modificar Tareas existentes
  - ✏️ Modificar Nombre de Usuario
  - ✏️ Modificar Contraseña
  - 🎛️ Filtrar Tarea por condicion
  - ❌ Eliminar Tareas
  - 🚪 Cerrar Sesion
  - 🗑️ Eliminar Cuenta


## ⚙️ Tecnologías

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** SQLite
- **Testing:** Jest (tests de unidad automatizados)
- **Control de versiones:** Git


## 📂 Estructura general
```text
TodoList/
├── Backend
|   ├── servicios/                  
|   │   ├── tareaservicio.js           
|   │   └── usuarioServicio.js
|   ├── Routes/
|   |   ├── tareaRuta.js
|   |   └── usuarioRuta.js
|   ├── consultas/                     
|   │   ├── tarea.sql             
|   │   └── usuario.sql
|   ├── Test/                     
|   │   ├── tareaRuta.test.js             
|   │   ├── tareaServicio.test.js
|   |   ├── usuarioRuta.test.js
|   |   └── usuarioServicio.test.js      
|   └── Utils/                    
|   |   ├── sqlLoader.js
|   |   └── validator.js
|   └── Index.js
├── Frontend/
|   ├──src/
|   |  ├── componets/
|   |  |    ├── CrearTareaModal.jsx
|   |  |    ├── EditarTareaModal.jsx
|   |  |    ├── Login.jsx
|   |  |    ├── OpcionesModal.jsx
|   |  |    ├── Registes.jsx
|   |  |    ├── RutaPrivada.jsx
|   |  |    ├── Sidebar.jsx
|   |  |    ├── Tareas.jsx
|   |  |    └── TaskCard.jsx
|   |  ├── App.css
|   |  ├── App.jsx
|   |  ├── Index.css
|   |  └── main.jsx 
|   └── index.html
└── README.md 
```

## 🔧 Endpoints de Usuario

| Método   | Endpoint                    | Descripción        |
| -------- | --------------------------- | -------------------|
| `GET`    | `/register`                 |                    |
| `GET`    | `/login`                    |                    |
| `GET`    | `/:id`                      |                    |
| `PUT`    | `/:id`                      |                    |
| `DELETE` | `/:id`                      |                    |


## 🔧 Endpoints de Tarea
| Método   | Endpoint                    | Descripción        |
| -------- | --------------------------- | -------------------|
| `POST`   | `/`                         |                    |
| `GET`    | `/:id`                      |                    |
| `GET`    | `/usuario/:id_usuario`      |                    |
| `PUT`    | `/:id`                      |                    |
| `DELETE` | `/:id`                      |                    |


## Diagrama Entidad Relacion de la base de datos
<p align="center">
  <img src="img/Diagrama entidad relacion BD usuario-tarea (1).png" alt="Captura de pantalla" width="500"/>
</p>

## 📦 Instalación
  ##### 1. Clonar Repositorio
```git
  git clone https://github.com/Rueda-Juan/ToDoListFinal.git
  cd ToDoListFinal
```
  #### 2. Instala las dependencias
  ```git
  npm install
  ```

  #### (Opcional). Ejecutar los Test
  ```git
  npm test
  ```

  #### 3. Ejecuta el servidor
  ```git
  npm run start
  ```
  Deberia abrir automaticamente en el navegador la siguiente URL
  ```git
  http://localhost:5173/
  ```



# Consola
"npm run build": crea las tablas sql (modificar en package.json en la parte de scripts)
"npm run dev": ejecuta index.js con *nodemon*

# postman

## http://localhost:3001/tareas
post:
{
  "id_usuario": 1,
  "titulo": "Comprar leche",
  "descripcion": "Ir al supermercado y comprar leche entera"
}

res:
{
    "id": 1,
    "id_usuario": 1,
    "titulo": "Comprar leche",
    "descripcion": "Ir al supermercado y comprar leche entera"
}

## http://localhost:3001/usuarios

post:
{
  "correo": "juanchi@example.com",
  "nombre": "Juanchi",
  "contraseña": "123456"
}

res:
{
  "id": 1,
  "correo": "juanchi@example.com",
  "nombre": "Juanchi"
}
