# 🌿 Huerto Hogar

<img width="1861" height="922" alt="image" src="https://github.com/user-attachments/assets/e857336f-244d-4b68-917b-b8b1c89481e8" />


**Huerto Hogar** es una aplicación web desarrollada con **React** que promueve el cultivo doméstico y la autogestión alimentaria.

---

## 🏡 Características principales

- 🌱 Catálogo de productos naturales y semillas  
- 🧺 Interfaz moderna
- 💾 Persistencia de datos con **localStorage**  
- 🔒 Flujo de autenticación local: registro e inicio de sesión  
- ⚙️ Desplegada en **AWS EC2 (Ubuntu)** con **Nginx** como servidor estático  

---

## ⚙️ Tecnologías utilizadas

| Tipo | Herramienta |
|------|--------------|
| Frontend | React, React Router, Bootstrap |
| Testing | Jasmine, Karma, Jest |
| Servidor | Nginx (Ubuntu, AWS EC2) |
| Persistencia | localStorage |
| Control de versiones | Git + GitHub |

---

## 💻 Instalación local

Clona el repositorio:

```bash
git clone https://github.com/itzAragorn/Huerto-Hogar.git
cd Huerto-Hogar
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el proyecto en modo desarrollo:

```bash
npm start
```

El sitio estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Pruebas unitarias

Huerto Hogar integra **Jasmine**, **Karma** y **Jest** para garantizar la estabilidad del proyecto.

### Ejecutar todas las pruebas

```bash
npm run test:all
```

### Ejecución individual

| Framework | Comando |
|------------|----------|
| Jasmine | `npx jasmine` o `npm run test:jasmine` |
| Karma | `npm run test:karma:single` |
| Jest | `npm test` |

### 📸 Ejemplos de ejecución

**Karma + Jasmine en Visual Studio Code**  
![Tests con Karma y Jasmine]<img width="975" height="429" alt="image" src="https://github.com/user-attachments/assets/cebd7010-7b4b-4396-befe-b42beed06048" />


**Jest con errores y éxitos**  
![Tests con Jest]<img width="975" height="679" alt="image" src="https://github.com/user-attachments/assets/c36b5792-d792-429a-ac43-2a6183ad2668" />


---

## 🚀 Despliegue en AWS EC2 con Nginx

La aplicación está desplegada en una instancia **Ubuntu (EC2)** sirviendo el build de React con **Nginx**.

### Pasos generales

```bash
# En el servidor
cd /var/www/Huerto-Hogar
git pull origin main
npm run build

# Reiniciar Nginx
sudo systemctl restart nginx
```

El sitio se sirve desde:

```
/var/www/Huerto-Hogar/build
```

---

## 🧩 Estructura del proyecto

```
Huerto-Hogar/
│
├── src/
│   ├── components/      # Componentes React
│   ├── tests/           # Pruebas unitarias (Jasmine / Jest)
│   ├── services/        # LocalStorageService, API local
│   └── App.js           # Punto principal de la app
│
├── public/
│
├── karma.conf.js
├── jasmine.json
├── jest.config.js
├── package.json
└── README.md
```

---

## 🧠 Estado del proyecto

✅ Versión estable  
🚧 Próximas mejoras:

- Conexión con base de datos real (MongoDB o PostgreSQL)  
- Panel de usuario avanzado  
- API REST para catálogo y pedidos  

---

## ERS Proyecto

[ERS Huerto Hogar.docx](https://github.com/user-attachments/files/23202234/ERS.Huerto.Hogar.docx)


## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.  
Desarrollado por **Javier Muñoz**, **Jairo Huaman** y **Nicolás Osses** 🧑‍💻

📬 Contacto: [itzAragorn](https://github.com/itzAragorn)
