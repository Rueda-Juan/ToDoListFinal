# ToDoListFinal
proyecto final de el curso cilsa fullstacks

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