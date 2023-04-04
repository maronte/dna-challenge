# DNA Mutation Detector API

Este es un proyecto de prueba técnica para el proceso de reclutamiento en Guros.

## Como ejecutar en local

### Prerequisitos

- MySQL >= 8.0
- node >= 19.0
- npm >= 8

Cabe aclarar que la versión alta de node se debe a que se hace uso del reemplazo de la herramienta nodemon con una funcionalidad integrada en node a partir de la mencionada versión. Esto permite "escuchar" los cambios en el código para recargar la aplicación en tiempo de desarrllo.

### Puesta en marcha

Una vez que tenga estos programas instalados por favor continúe de la siguiente forma:

1. Instale todas las dependencias del proyecto, incluidas las de desarrollo para poder ejecutar las pruebas automatizadas. Esto se hace con el comando:

    ```sh
        npm install -D
    ```

2. Inicialice MySQL. Dependiendo de la forma de instalación esto puede variar mucho, pero en caso de usar DBngin y tener sistema operativo MacOS únicamente debe ejecutar y prender la instancia de MySQL con el boton "start"

3. Ejecute el script db.sql con la herramienta de su preferencia. Puede usar la consola o una herramienta visual de gestión de bases de datos

4. Ejecute el siguiente comando para inicializar el proyecto. En caso de tener una versión anterior a node 19 ejecute el comando 2.

    1. ```sh
          npm run local-dev
       ```

    2. ```sh
          npm run local
       ```

5. Ha ejecutado todos los pasos satisfactoriamente.

### Pruebas

Usted puede fácilmente ejecutar pruebas automatizadas del proyecto con el siguiente comando:

```sh
    npm run test
```

Este comando a su vez también le brindará un análisis de cobertura del código.

### Proyecto desplegado

Este proyecto corre sobre una infraestructura de AWS con los servicios RDS, AWS Lambda y AWS Gateway. Para poder verlo en "producción" visite la siguiente ruta: https://0rponl1jk7.execute-api.us-west-1.amazonaws.com/

Este proyecto tiene muchas áreas de oportunidad detectadas en el tiempo de desarrollo. Tales como implementación de docker para ejecución local o el mismo desarrollo del README con más detalles de todo el proceso de desarrollo, entre muchas otras. Estas se omitieron por tiempo de desarrollo y se pueden discutir con todo gusto en una posible retroalimentación de la prueba. Sin más por el momento gracias por la atención y la oportunidad.
