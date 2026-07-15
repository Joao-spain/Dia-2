const URL_CLIMA = "https://api.open-meteo.com/v1/forecast?latitude=-0.2298&longitude=-78.5258&hourly=temperature_2m&current_weather=true&timezone=auto";


const btnClima = document.getElementById("btnClima");
const btnActualizarClima = document.getElementById("btnActualizarClima");
const contenedorClima = document.getElementById("climaContainer");
const mensajeClima = document.getElementById("mensajeClima");

async function obtenerClimaQuito() {
    if (!mensajeClima || !contenedorClima) return;

    try {
        mensajeClima.textContent = "Conectando Satelites...";
        contenedorClima.innerHTML = "";
        let respuesta = await fetch(URL_CLIMA);
        let datosConvertidos = await respuesta.json();
        let climActual = datosConvertidos.current_weather;
        if (!climActual) throw new Error('Información de clima actual no disponible');
        mensajeClima.textContent = "";

        const tarjetaClima = document.createElement("div");
        tarjetaClima.classList.add("tarjeta-clima");
        let estadoClima = "Despejado o nublado";

        if(climActual.weathercode>=61 && climActual.weathercode<=65) estadoClima = "Lluvia ligera";
        if(climActual.weathercode>=66 && climActual.weathercode<=67) estadoClima = "Lluvia moderada";
        if(climActual.weathercode>=71 && climActual.weathercode<=75) estadoClima = "Nieve ligera";
        if(climActual.weathercode>=77 && climActual.weathercode<=77) estadoClima = "Nieve moderada";
        if(climActual.weathercode>=80 && climActual.weathercode<=82) estadoClima = "Lluvia intensa";
        if(climActual.weathercode>=85 && climActual.weathercode<=86) estadoClima = "Nieve intensa";

        
        tarjetaClima.innerHTML = `
            <h3>Clima en Quito</h3>
            <p>Temperatura: ${climActual.temperature}°C</p>
            <p>Estado: ${estadoClima}</p>
            <span>Viento: ${climActual.windspeed} km/h</span>
        `;
        contenedorClima.appendChild(tarjetaClima);
    }catch (error) {
        console.error(error);
        mensajeClima.textContent = "No se pudo obtener el clima. " + (error.message || 'Intenta más tarde.');
    }
}

if (btnClima) {
    btnClima.addEventListener("click", obtenerClimaQuito);
} else {
    console.warn('Botón con id "btnClima" no encontrado en el DOM.');
}

if (btnActualizarClima) {
    btnActualizarClima.addEventListener("click", obtenerClimaQuito);
}