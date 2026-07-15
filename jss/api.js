const API_URL = 'https://reqres.in/api/users?page=2';

const btnCargar = document.getElementById('btnCargar');
const listaContenedor = document.getElementById('listaTareas');
const mensaje = document.getElementById('mensaje');



async function obtenerUsuarios() {
    try {
        mensaje.textContent = 'Cargando usuarios...';
        listaContenedor.innerHTML = '';

        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar usuarios: ${respuesta.status}`);
        }

        const datosConvertidos = await respuesta.json();
        const usuarios = datosConvertidos.data || [];
        mensaje.textContent = '';

        usuarios.forEach(usuario => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-item';

            tarjeta.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${usuario.avatar}" alt="Avatar de ${usuario.first_name}" class="avatar">
                    <div>
                        <h4>${usuario.first_name} ${usuario.last_name}</h4>
                        <p>${usuario.email}</p>
                    </div>
                </div>
            `;
            listaContenedor.appendChild(tarjeta);
        });
    } catch (error) {
        mensaje.textContent = 'No se pudieron cargar los usuarios. Intenta de nuevo.';
        console.error(error);
    }
}
if(btnCargar) {
    btnCargar.addEventListener('click', obtenerUsuarios);
}