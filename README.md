# 🌿 Huerto Hogar -- Frontend (React)

**Huerto Hogar** es una aplicación web desarrollada como parte de la
asignatura **Desarrollo Fullstack -- DUOC UC**, sección **003D**.\
Este repositorio contiene el **frontend completo**, desarrollado en
**React**, conectado a un backend REST en Spring Boot.

------------------------------------------------------------------------

# 🧾 1. Descripción del Proyecto

Huerto Hogar permite:

-   Visualizar productos de jardinería
-   Consultar categorías
-   Navegar por un blog informativo
-   Iniciar sesión y registrarse
-   Consumir un backend vía API REST
-   Ejecutar pruebas unitarias (Jest, Karma, Jasmine)

Este proyecto forma parte del desarrollo fullstack realizado por:

  Integrante          Rol                       Institución
  ------------------- ------------------------- -------------
  **Javier Muñoz**    Desarrollador Fullstack   DUOC UC
  **Nicolás Osses**   Desarrollador Frontend    DUOC UC
  **Jairo Huaman**    Desarrollador Frontend    DUOC UC

------------------------------------------------------------------------

# 📌 2. Evidencias del Proyecto

Inserte aquí capturas de pantalla reales del sistema:

### 🏠 Página de Inicio (Home)

**(Inserte su imagen aquí)**

    ![Home Screenshot](./images/home.png)

### 🛒 Catálogo

**(Inserte su imagen aquí)**

    ![Catalog Screenshot](./images/catalog.png)

### 🧪 Pruebas Unitarias

**(Inserte la captura de resultados Jest/Karma aquí)**

    ![Unit Tests](./images/tests.png)

------------------------------------------------------------------------

# 📄 3. Resumen del ERS (Especificación de Requisitos del Sistema)

Inserte el ERS en PDF aquí, o resuma brevemente:

    [ERS_Huerto_Hogar.pdf](./docs/ERS_Huerto_Hogar.pdf)

### 📘 Como referencia, incluya aquí un resumen manual:

-   Objetivo general del sistema\
-   Requisitos funcionales principales\
-   Requisitos no funcionales\
-   Casos de uso\
-   Descripción general de usuarios\
-   Arquitectura esperada

*(Puedes copiar/pegar desde tu documento ERS cargado.)*

------------------------------------------------------------------------

# 🧱 4. Arquitectura del Proyecto

    Huerto-Hogar/
     ├── public/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   ├── services/
     │   ├── tests/
     │   ├── styles/
     │   └── App.js
     ├── package.json
     └── README.md

------------------------------------------------------------------------

# 🔌 5. Conexión con el Backend

Backend del proyecto disponible en:\
👉 https://github.com/saruo-san/Huerto-Hogar-Backend

En `src/services/ApiService.js` se configura la base URL:

``` js
class ApiService {
  static BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";
}
```

### Variables de entorno recomendadas

**Modo desarrollo:**

    REACT_APP_API_BASE_URL=http://localhost:8080/api

**Producción (EC2):**

    REACT_APP_API_BASE_URL=/api

------------------------------------------------------------------------

# 🛠️ 6. Instalación y ejecución

### 1. Clonar

``` bash
git clone https://github.com/saruo-san/Huerto-Hogar.git
cd Huerto-Hogar
```

### 2. Instalar dependencias

``` bash
npm install
```

### 3. Ejecutar en desarrollo

``` bash
npm start
```

### 4. Ejecutar pruebas

``` bash
npm test
```

------------------------------------------------------------------------

# 🚀 7. Build para producción

``` bash
REACT_APP_API_BASE_URL=/api npm run build
```

El build se genera en:

    build/

------------------------------------------------------------------------

# 🌐 8. Despliegue en AWS EC2

Configurar Nginx:

``` nginx
location / {
  try_files $uri /index.html;
}

location /api/ {
  proxy_pass http://127.0.0.1:8080/api/;
}
```

------------------------------------------------------------------------

# 📎 9. Repositorios relacionados

Frontend\
👉 https://github.com/saruo-san/Huerto-Hogar

Backend\
👉 https://github.com/saruo-san/Huerto-Hogar-Backend

------------------------------------------------------------------------

# 📄 10. Licencia

Proyecto académico -- uso educativo y demostrativo.

------------------------------------------------------------------------

# 📌 NOTA

Este README incluye **espacios reservados** para que insertes:

-   Imágenes del frontend\
-   Resultados de pruebas unitarias\
-   ERS completo en PDF

¡Solo reemplaza las rutas y queda perfecto para tu evaluación!
