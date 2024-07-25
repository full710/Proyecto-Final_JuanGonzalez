const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'))

if (!usuarioLogueado) {
    alert('Debes iniciar sesión para acceder a esta página.')
    window.location.href = './login.html'
}

const peliculaSeleccionada = JSON.parse(sessionStorage.getItem('peliculaSeleccionada'))
const peliculas = JSON.parse(localStorage.getItem('peliculas'))
const peliculaActualizada = peliculas.find(p => p.nombre === peliculaSeleccionada.nombre)

const datosCompra = {
    butacas: [],
    cantidadButacas: 0,
    costoTotal: 0,
    nombre: peliculaSeleccionada.nombre,
    precio: peliculaSeleccionada.costo_entrada,
    formato: peliculaSeleccionada.formato,
    afiche: peliculaSeleccionada.afiche
}

const contenedorCine = document.getElementById('contenedor-cine')
const contenedorDescripcion = document.getElementById('contenedor-descripcion')
const contenedorResumen = document.getElementById('contenedor-resumen')
const listaBoletos = document.createElement('ul')
contenedorResumen.appendChild(listaBoletos)

const seleccionarPeliculaYCarrito = () => {
    contenedorDescripcion.innerHTML = ''
    contenedorCine.innerHTML = ''
    contenedorResumen.innerHTML = ''
    contenedorResumen.appendChild(listaBoletos)

    const afiche = document.createElement('img')
    afiche.src = peliculaSeleccionada.afiche
    afiche.alt = `Afiche de ${peliculaSeleccionada.nombre}`
    afiche.className = 'afiche'

    const datosPelicula = document.createElement('div')
    datosPelicula.className = 'datos-pelicula'
    datosPelicula.innerHTML = `
        <p><strong>Nombre:</strong> ${peliculaSeleccionada.nombre}</p>
        <p><strong>Formato:</strong> ${peliculaSeleccionada.formato}</p>
        <p><strong>Precio Entrada:</strong> $${peliculaSeleccionada.costo_entrada}</p>
    `

    contenedorDescripcion.appendChild(afiche)
    contenedorDescripcion.appendChild(datosPelicula)

    const pantalla = document.createElement('div')
    pantalla.className = 'pantalla'
    pantalla.textContent = `Pantalla ${peliculaSeleccionada.nombre}`
    contenedorCine.appendChild(pantalla)

    const crearGrupoButacas = (cantidad, numeroInicial, butacasOcupadas) => {
        const grupoButacas = document.createElement('div')
        grupoButacas.className = 'grupo-butacas'

        for (let i = 0; i < cantidad; i++) {
            const butaca = document.createElement('div')
            butaca.className = 'butaca'
            butaca.dataset.numero = numeroInicial + i
            butaca.textContent = butaca.dataset.numero
            butaca.addEventListener('click', () => seleccionarButaca(butaca))
            grupoButacas.appendChild(butaca)

            if (butacasOcupadas.includes(parseInt(butaca.dataset.numero))) {
                butaca.classList.add('ocupada')
            }
        }
        return grupoButacas
    }

    const crearPasillo = () => {
        const pasillo = document.createElement('div')
        pasillo.className = 'pasillo'
        return pasillo
    }

    const seleccionarButaca = (butaca) => {
        if (butaca.classList.contains('ocupada')) {
            return
        }
        butaca.classList.toggle('seleccionada')
        const numeroButaca = parseInt(butaca.dataset.numero)

        if (butaca.classList.contains('seleccionada')) {
            addCarrito(numeroButaca, peliculaSeleccionada)
            datosCompra.cantidadButacas++
            datosCompra.butacas.push(numeroButaca)
            datosCompra.costoTotal += datosCompra.precio
        } else {
            quitarCarrito(numeroButaca)
            datosCompra.cantidadButacas--
            const indiceButaca = datosCompra.butacas.indexOf(numeroButaca)
            if (indiceButaca !== -1) {
                datosCompra.butacas.splice(indiceButaca, 1)
                datosCompra.costoTotal -= datosCompra.precio
            }
        }

        actualizarButacas()
        mostrarResumenCompra()
    }

    const addCarrito = (numeroButaca, pelicula) => {
        const itemLista = document.createElement('li')
        itemLista.textContent = `Butaca n° ${numeroButaca} -- $${pelicula.costo_entrada}`
        itemLista.dataset.numero = numeroButaca
        listaBoletos.appendChild(itemLista)
    }

    const quitarCarrito = (numeroButaca) => {
        const itemAgregado = listaBoletos.querySelector(`li[data-numero="${numeroButaca}"]`)
        if (itemAgregado) {
            listaBoletos.removeChild(itemAgregado)
        }
    }

    const actualizarButacas = () => {
        const butacas = contenedorCine.querySelectorAll('.butaca')
        butacas.forEach(butaca => {
            const numero = parseInt(butaca.dataset.numero)
            if (datosCompra.butacas.includes(numero)) {
                butaca.classList.add('seleccionada')
            } else {
                butaca.classList.remove('seleccionada')
            }
            if (peliculaActualizada.butacasOcupadas.includes(numero)) {
                butaca.classList.add('ocupada')
            }
        })
    }

    const mostrarResumenCompra = () => {
        contenedorResumen.innerHTML = ''
        contenedorResumen.appendChild(listaBoletos)
    
        if (datosCompra.butacas.length === 0) {
            const mensajeVacio = document.createElement('p')
            mensajeVacio.textContent = 'El carrito está vacío'
            contenedorResumen.appendChild(mensajeVacio)
        } else {
            const nombrePelicula = document.createElement('p')
            nombrePelicula.textContent = `Película: ${datosCompra.nombre}`
            contenedorResumen.appendChild(nombrePelicula)
    
            const costoTotal = document.createElement('p')
            costoTotal.textContent = `Costo total: $${datosCompra.costoTotal}`
            contenedorResumen.appendChild(costoTotal)
    
            const botonConfirmar = document.createElement('button')
                botonConfirmar.textContent = 'Confirmar Compra'
                botonConfirmar.className = 'btn btn-outline-success w-50'
                botonConfirmar.addEventListener('click', () => {
                    
                    Swal.fire({
                        title: "¿Estás seguro de confirmar la compra?",
                        showCancelButton: true,
                        confirmButtonText: "Sí, confirmar",
                        cancelButtonText: "No, continuar"
                    }).then((result) =>{
                        if (result.isConfirmed) {
                        const nuevaVentana = window.open('', '_blank');
                        nuevaVentana.document.write(`
                            <html>
                            <head>
                                <title>Resumen de Compra</title>
                                <link rel="stylesheet" type="text/css" href="ruta/a/tu/archivo/estilos.css">
                            </head>
                            <body>
                                <div class="boleto">
                                    <h2>Boleto de Cine</h2>
                                    <p><strong>Película:</strong> ${datosCompra.nombre}</p>
                                    <p><strong>Formato:</strong> ${datosCompra.formato}</p>
                                    <p><strong>Butacas:</strong> ${datosCompra.butacas.join(', ')}</p>
                                    <p><strong>Costo Total:</strong> $${datosCompra.costoTotal}</p>
                                    <button class="btn-descargar" onclick="window.print()">Descargar Boleto</button>
                                </div>
                            </body>
                            </html>
                        `
                        )
                        peliculaActualizada.butacasOcupadas.push(...datosCompra.butacas)
                        localStorage.setItem('peliculas', JSON.stringify(peliculas))
                        nuevaVentana.document.close()
                        Swal.fire("Compra realizada con éxito", "", "success").then(() => {
                            window.location.href = '../index.html'
                        })
                    }})
                })
                contenedorResumen.appendChild(botonConfirmar)
            contenedorResumen.appendChild(botonConfirmar)
    
            const botonCancelar = document.createElement('button')
            botonCancelar.textContent = 'Cancelar'
            botonCancelar.className = 'btn btn-outline-danger w-50'
            botonCancelar.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de que quieres cancelar la compra?",
                    showCancelButton: true,
                    confirmButtonText: "Sí, cancelar",
                    cancelButtonText: "No, continuar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Compra cancelada", "", "error").then(() => {
                            window.location.reload()
                        });
                    }
                });
            });
            contenedorResumen.appendChild(botonCancelar);
        }
    }

    const crearCine = () => {
        const filas = 10;
        let numeroButaca = 1;

        for (let fila = 1; fila <= filas; fila++) {
            const grupoButacas1 = crearGrupoButacas(3, numeroButaca, peliculaActualizada.butacasOcupadas)
            numeroButaca += 3
            const pasillo1 = crearPasillo()
            const grupoButacas2 = crearGrupoButacas(6, numeroButaca, peliculaActualizada.butacasOcupadas)
            numeroButaca += 6
            const pasillo2 = crearPasillo()
            const grupoButacas3 = crearGrupoButacas(3, numeroButaca, peliculaActualizada.butacasOcupadas)
            numeroButaca += 3

            const filaElemento = document.createElement('div')
            filaElemento.className = 'fila'
            filaElemento.appendChild(grupoButacas1)
            filaElemento.appendChild(pasillo1)
            filaElemento.appendChild(grupoButacas2)
            filaElemento.appendChild(pasillo2)
            filaElemento.appendChild(grupoButacas3)

            contenedorCine.appendChild(filaElemento)
        }
    }

    crearCine()
    mostrarResumenCompra()
}

document.addEventListener('DOMContentLoaded', seleccionarPeliculaYCarrito)
