document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault()
    
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    
    if (usuarios.some(usuario => usuario.username === username)) {
        Swal.fire({
            icon: 'error',
            title: 'El nombre de usuario ya está en uso.',
            confirmButtonText: 'OK'
        })
    } else {
        usuarios.push({ username, password })
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = './login.html'
        })
    }
})
