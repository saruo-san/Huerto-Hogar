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
  -**Javier Muñoz**    Desarrollador Fullstack   DUOC UC
  
  -**Nicolás Osses**   Desarrollador Frontend    DUOC UC
  
  -**Jairo Huaman**    Desarrollador Frontend    DUOC UC

------------------------------------------------------------------------

# 📌 2. Evidencias del Proyecto


### 🏠 Página de Inicio (Home)

   <img width="1861" height="922" alt="image" src="https://github.com/user-attachments/assets/ae2bcb1f-68a9-4229-b8e2-b866927fb436" />

### 🧪 Pruebas Unitarias

  <img width="975" height="429" alt="image" src="https://github.com/user-attachments/assets/4f01b5d3-1113-457c-865d-a7c6e2518f65" />

  <img width="975" height="679" alt="image" src="https://github.com/user-attachments/assets/65605d9c-58c3-44d5-b392-d4b11d81dbc3" />

  
------------------------------------------------------------------------

# 📄 3. Resumen del ERS (Especificación de Requisitos del Sistema)

[ERS.Huerto.Hogar.docx](https://github.com/user-attachments/files/23733650/ERS.Huerto.Hogar.docx)

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
