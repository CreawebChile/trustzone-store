// Generar copos de nieve
function crearCopoDeNieve() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄'; // Puedes usar otros símbolos como "✦" o "❅"
    snowflake.style.left = Math.random() * window.innerWidth + 'px'; // Posición inicial aleatoria
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Duración de caída aleatoria
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px'; // Tamaño aleatorio del copo
    snowflake.style.opacity = Math.random(); // Transparencia aleatoria

    document.body.appendChild(snowflake);

    // Eliminar el copo después de la animación para evitar acumulación
    setTimeout(() => {
        snowflake.remove();
    }, 5000); // Tiempo coincide con la duración máxima de la animación
}

// Crear copos de nieve cada 200ms
setInterval(crearCopoDeNieve, 200);
