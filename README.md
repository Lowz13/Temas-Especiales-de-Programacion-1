# Temas-Especiales-de-Programacion-1

En la carpeta Tarea 3 se tiene la la conexion a base de datos, pero para no instalar todo se debe de instalar docker y tambien instalar una imagen de mongo db.

Las librerias necesarias de node son:

```
npm install express cors mongoose
```

Y al usar docker para mantener la base de datos arriba y conectarse de forma local se usara este comando

```
docker run -d 
--name my-mongodb 
-p 27017:27017 
-e MONGO_INITDB_ROOT_USERNAME=admin 
-e MONGO_INITDB_ROOT_PASSWORD=secretpassword 
-v mongo_data:/data/db 
mongo:latest
```

Y para detener el contenedor se usara

```
docker stop my-mongodb 
```
