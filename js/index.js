document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'))

    const botonAcceder = document.getElementById('acceso')
    const botonRegistrar = document.getElementById('registrar')
    const contenedorBotones = document.querySelector('.col-md-3')

    

    if (usuarioLogueado) {
        botonAcceder.classList.add('d-none')
        botonRegistrar.classList.add('d-none')

        const irCartelera = document.createElement('button')
        irCartelera.textContent = 'Ir a la cartelera'
        irCartelera.classList.add('btn', 'btn-success', 'me-2')
        irCartelera.addEventListener('click', () => window.location.href = './cartelera.html')

        const logoutButton = document.createElement('button')
        logoutButton.textContent = 'Cerrar sesión'
        logoutButton.classList.add('btn', 'btn-danger')
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('usuarioLogueado')
            window.location.href = './index.html'
        });

        contenedorBotones.appendChild(irCartelera)
        contenedorBotones.appendChild(logoutButton)
    } else {
        botonAcceder.addEventListener('click', () => window.location.href = './login.html')
        botonRegistrar.addEventListener('click', () => window.location.href = './registro.html')
    }

    const mostrarToast = localStorage.getItem('mostrarToast')
    if (mostrarToast === 'true') {
        Toastify({
            text: "Inicio de sesión exitoso",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            newWindow: true,
            duration: 3000
        }).showToast()
        localStorage.removeItem('mostrarToast')
    }
})
