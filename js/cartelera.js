
const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'))

if (!usuarioLogueado) {
    alert('Debes iniciar sesión para acceder a esta página.')
    window.location.href = './login.html'
}

const cargarPeliculas = async () => {
    try {
        let peliculas = JSON.parse(localStorage.getItem('peliculas'))

        if (!peliculas) {
            const response = await fetch('../peliculas.json')
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.statusText}`)
            }
            peliculas = await response.json()
            localStorage.setItem('peliculas', JSON.stringify(peliculas))
        }

        mostrarCartelera(peliculas)
    } catch (error) {
        console.error('Error cargando las películas:', error)
    }
}


function mostrarCartelera(peliculas) {
    const cartelera = document.getElementById('cartelera')
    if (!cartelera) {
        console.error('Contenedor de cartelera no encontrado en el HTML')
        return
    }

    peliculas.forEach((pelicula) => {
        const peliculaElemento = document.createElement('div')
        peliculaElemento.className = 'pelicula'

        const imagen = document.createElement('img')
        imagen.src = pelicula.afiche

        const descripcion1 = document.createElement('p')
        const descripcion2 = document.createElement('p')
        const descripcion3 = document.createElement('p')
        const seleccionar = document.createElement('button')

        descripcion1.className = 'nombre'
        descripcion2.className = 'formato'
        descripcion3.className = 'costo-entrada'

        descripcion1.textContent = pelicula.nombre
        descripcion2.textContent = `Formato: ${pelicula.formato}`
        descripcion3.textContent = `Costo de la entrada: $${pelicula.costo_entrada}`

        seleccionar.className = 'boton-seleccionar'
        seleccionar.textContent = 'COMPRAR ENTRADAS'
        seleccionar.className = 'btn btn-outline-primary'
        seleccionar.addEventListener('click', () => {
            sessionStorage.setItem('peliculaSeleccionada', JSON.stringify(pelicula))
            window.location.href = './cine.html'
        })

        peliculaElemento.appendChild(imagen)
        peliculaElemento.appendChild(descripcion1)
        peliculaElemento.appendChild(descripcion2)
        peliculaElemento.appendChild(descripcion3)
        peliculaElemento.appendChild(seleccionar)

        cartelera.appendChild(peliculaElemento)
    })
}

cargarPeliculas()
