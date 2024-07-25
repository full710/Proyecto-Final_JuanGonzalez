document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuario = usuarios.find(usuario => usuario.username === username && usuario.password === password)

    if (usuario) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
        localStorage.setItem('mostrarToast', 'true')
        window.location.href = "../index.html"
    } else {
        alert('Usuario o contraseña incorrectos.')
    }
});

const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'))
if (usuarioLogueado) {
    const logoutButton = document.createElement('button')
    logoutButton.textContent = 'Cerrar sesión'
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('usuarioLogueado')
        window.location.href = "../index.html"
    });
    document.body.appendChild(logoutButton)
}
