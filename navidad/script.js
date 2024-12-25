const locations = [
    "el Polo Norte",
    "Nueva Zelanda",
    "Australia",
    "Japón",
    "China",
    "India",
    "Rusia",
    "Dubai",
    "Turquía",
    "Grecia",
    "Italia",
    "Francia",
    "España",
    "Reino Unido",
    "Brasil",
    "Argentina",
    "Chile"
];

function updateSantaLocation() {
    const now = new Date();
    const christmas = new Date(now.getFullYear(), 11, 25);
    const timeDiff = christmas - now;
    
    // Si ya pasó la medianoche de Navidad
    if (timeDiff < 0) {
        document.getElementById('current-location').textContent = "ya pasó y dejó todos los regalos 🎁";
        document.getElementById('location-prefix').textContent = "¡Santa ";
        return;
    }
    
    // Si es exactamente medianoche de Navidad
    if (timeDiff === 0) {
        document.getElementById('current-location').textContent = "está dejando los regalos 🎁";
        document.getElementById('location-prefix').textContent = "¡Santa ";
        return;
    }
    
    // Mensaje por defecto antes de Navidad
    document.getElementById('current-location').textContent = "está viajando para entregar los regalos ✨";
    document.getElementById('location-prefix').textContent = "¡Santa ";
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25); // Month is 0-based
    
    if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
    }
    
    const diff = christmas - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Actualizar cada segundo para el countdown y cada minuto para la ubicación
setInterval(updateCountdown, 1000);
setInterval(updateSantaLocation, 60000); // Actualiza ubicación cada minuto

// Initial update
updateCountdown();
updateSantaLocation();
