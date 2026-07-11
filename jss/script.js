const formulario = document.getElementById('formTarea');
const lista = document.getElementById('ListaTareas');
const mensaje = document.getElementById('mensaje');

let tareas = [];

formulario.addEventListener('submit', agregarTarea);

function agregarTarea(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const prioridad = document.getElementById('prioridad').value;
    const fecha = document.getElementById('fecha').value;
    if (nombre === ''||fecha === '') {
        mensaje.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    mensaje.textContent = '';
    tareas.push({ nombre, prioridad, fecha, estado: false });
    formulario.reset();
    mostrarTareas();
    actualizarResumen();
}

function mostrarTareas() {
    lista.innerHTML = '';
    
    if (tareas.length === 0) {
        lista.innerHTML = '<p>No hay tareas aún.</p>';
        return;
    }

    tareas.forEach((tarea, index) => {
        const div = document.createElement('div');
        div.className = `tarea ${tarea.prioridad.toLowerCase()}`;
        
        const estado = tarea.estado ? 'completada' : 'pendiente';
        const claseEstado = tarea.estado ? 'completada' : '';
        
        div.innerHTML = `
            <div class="tarea-contenido ${claseEstado}">
                <h4>${tarea.nombre}</h4>
                <p><strong>Prioridad:</strong> ${tarea.prioridad}</p>
                <p><strong>Fecha:</strong> ${tarea.fecha}</p>
                <p><strong>Estado:</strong> ${estado}</p>
            </div>
            <div class="tarea-acciones">
                <button onclick="completarTarea(${index})" class="btn-completar">
                    ${tarea.estado ? 'Deshacer' : 'Completar'}
                </button>
                <button onclick="eliminarTarea(${index})" class="btn-eliminar">Eliminar</button>
            </div>
        `;
        
        lista.appendChild(div);
    });
}

function completarTarea(index) {
    tareas[index].estado = !tareas[index].estado;
    mostrarTareas();
    actualizarResumen();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
    actualizarResumen();
}

function actualizarResumen() {
    const total = tareas.length;
    const completadas = tareas.filter(tarea => tarea.estado).length;
    const pendientes = total - completadas;
    
    document.getElementById('total').textContent = total;
    document.getElementById('completadas').textContent = completadas;
    document.getElementById('pendientes').textContent = pendientes;
}