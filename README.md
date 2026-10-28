# 📝 To-Do List para Usuarios
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-5.x-lightgrey?logo=express) ![Vite](https://img.shields.io/badge/Vite-7.x-purple?logo=vite) ![React](https://img.shields.io/badge/React-18.x-blue?logo=react) ![Nodemon](https://img.shields.io/badge/Nodemon-3.x-brightgreen?logo=nodemon) ![SQLite](https://img.shields.io/badge/SQLite-3.x-lightblue?logo=sqlite) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)

  #### Integrantes:
   - Rueda Juan Bautista
   - Javier Agustin Rodriguez
  
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
  - ❌ Eliminar Tareas
  - 🚪 Cerrar Sesion
  - 🗑️ Eliminar Cuenta
  <!-- - 🎛️ Filtrar Tarea por condicion -->


## ⚙️ Tecnologías

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + nodemon
- **Base de datos:** SQLite
- **Testing:** Jest (tests de unidad automatizados) + SuperTest
- **Control de versiones:** Git
- **Alertas Modales** SweetAlert2

hola

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

| Método   | Endpoint                    | Descripción                                         |
| -------- | --------------------------- | ----------------------------------------------------|
| `GET`    | `/register`                 | `Registra un nuevo usuario en el sistema`           |
| `GET`    | `/login`                    | `Permite que un usuario inicie sesion`              |
| `GET`    | `/:id`                      | `Obtiene la informacion de un usuario dado su ID`   |
| `PUT`    | `/:id`                      | `Actualiza el nombre y/o contraseña de un usuario`  |
| `DELETE` | `/:id`                      | `Elimina un usuario del sistema por su ID.`         |


## 🔧 Endpoints de Tarea
| Método   | Endpoint                    | Descripción                                        |
| -------- | --------------------------- | ---------------------------------------------------|
| `POST`   | `/`                         |`Crea una nueva tarea para un usuario`              |
| `GET`    | `/:id`                      | `Obtiene una tarea específica según su ID.`        |
| `GET`    | `/usuario/:id_usuario`      | `Devuelve todas las tareas asociadas a un usuario.`|
| `PUT`    | `/:id`                      | `Actualiza los datos de una tarea existente.`      |
| `DELETE` | `/:id`                      | `Elimina una tarea por su ID.`                     |


## Diagrama Entidad Relacion de la base de datos
<p align="center">
  <img src="img/Diagrama entidad relacion BD usuario-tarea (1).png" alt="Captura de pantalla" width="500"/>
</p>

## Consultas SQL

 - #### Creacion de la tabla Usuario
```sql
    CREATE TABLE IF NOT EXISTS Usuario(
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            contraseña TEXT NOT NULL
        )
```
 - #### consultas SQL para Usuario
```sql
-- crear_usuario
INSERT INTO Usuario(correo, nombre, contraseña) VALUES (?, ?, ?);

-- obtener_usuario
SELECT * FROM Usuario WHERE id_usuario = ?;

-- obtener_usuario_por_correo
SELECT * FROM Usuario WHERE correo = ?;

-- actualizar_usuario
UPDATE Usuario SET {campos} WHERE id_usuario = ?;

-- eliminar_usuario
DELETE FROM Usuario WHERE id_usuario = ?;
```
 - #### Creacion de la tabla Tarea
``` sql
    CREATE TABLE IF NOT EXISTS Tarea(
            id_tarea INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
            completada INTEGER DEFAULT 0,
            FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
        )
```
 - #### Constula SQL para Tarea
```sql
-- crear_tarea
INSERT INTO Tarea(id_usuario, titulo, descripcion) VALUES (?, ?, ?);

-- obtener_tarea
SELECT * FROM Tarea WHERE id_tarea = ?;

-- obtener_tareas_por_usuario
SELECT * FROM Tarea WHERE id_usuario = ?;

-- actualizar_tarea
UPDATE Tarea SET {campos} WHERE id_tarea = ?;

-- eliminar_tarea
DELETE FROM Tarea WHERE id_tarea = ?;
```
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
