# 🎬 Proyecto de Aplicación de Cine

Este proyecto es una aplicación de cine que permite a los usuarios ver la cartelera, seleccionar películas y butacas, y confirmar la compra de entradas. A continuación se describen los archivos principales de la aplicación y su funcionalidad.

## 📁 Archivos y Funcionalidades

### `cartelera.js`
Este archivo es responsable de cargar y mostrar la cartelera de películas disponibles.

- **Verificación de usuario logueado:** Comprueba si el usuario ha iniciado sesión; si no, redirige a la página de inicio de sesión.
- **Carga de películas:** Carga la lista de películas desde el almacenamiento local o desde un archivo JSON si no está disponible en localStorage.
- **Mostrar cartelera:** Muestra la cartelera de películas en la página web, creando dinámicamente los elementos HTML para cada película.
- **Selección de película:** Permite seleccionar una película y redirige a la página de selección de butacas.

### `funcionalidad-cine.js`
Este archivo maneja la selección de butacas y la gestión del carrito de compra.

- **Verificación de usuario logueado:** Comprueba si el usuario ha iniciado sesión; si no, redirige a la página de inicio de sesión.
- **Selección de película:** Recupera la información de la película seleccionada y la muestra en la página.
- **Gestión de butacas:** Permite seleccionar y deseleccionar butacas, actualizando el carrito de compra en consecuencia.
- **Resumen de compra:** Muestra un resumen de la compra con las butacas seleccionadas y el costo total.
- **Confirmar compra:** Permite confirmar la compra, mostrando un resumen en formato de simulación de boleto y actualizando las butacas ocupadas.

### `index.js`
Este archivo maneja la lógica de la página principal y la gestión de la sesión del usuario.

- **Verificación de usuario logueado:** Comprueba si el usuario ha iniciado sesión y muestra u oculta los botones de acceso y registro en consecuencia.
- **Redirección a cartelera:** Permite al usuario logueado ir a la página de cartelera.
- **Cerrar sesión:** Permite al usuario cerrar sesión.

### `login.js`
Este archivo maneja la lógica de la página de inicio de sesión.

- **Inicio de sesión:** Verifica las credenciales del usuario y, si son correctas, guarda al usuario en el localStorage y redirige a la página principal.
- **Cerrar sesión:** Permite al usuario cerrar sesión desde la página de inicio de sesión.

### `registro.js`
Este archivo maneja la lógica de la página de registro.

- **Registro de usuario:** Permite registrar un nuevo usuario, guardando sus datos en el localStorage.
- **Verificación de nombre de usuario:** Comprueba si el nombre de usuario ya está en uso y muestra un mensaje de error si es así.

## 🛠️ Instalación

1. Clona el repositorio en tu máquina local.
2. Abre el proyecto en tu editor de código preferido.
3. Asegúrate de tener un servidor local (como `Live Server` en VSCode) para visualizar el proyecto correctamente, ya que se utilizan archivos locales (JSON, imágenes).

## 🚀 Uso

1. Abre el archivo `index.html` en tu navegador.
2. Regístrate o inicia sesión.
3. Navega a la cartelera y selecciona una película.
4. Selecciona las butacas y confirma la compra.

## 📦 Dependencias

- **Bootstrap:** Para el diseño y estilos responsivos de la aplicación.
- **SweetAlert2:** Para los diálogos de confirmación y mensajes de alerta.
- **Toastify:** Para las notificaciones emergentes.

## 🔮 Próxima Versión

En la próxima versión, se integrará la API de [The Movie Database](https://www.themoviedb.org/settings/api) para obtener información actualizada sobre las películas. También se incluirán las siguientes funcionalidades:

- Elección de días y horarios de las funciones.
- Tienda de snacks para comprar alimentos y bebidas.


