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

// Manejo del formulario de mensajes
document.getElementById('santa-message').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = this.querySelector('textarea').value;
    
    // Limpiar previsualizaciones
    document.getElementById('preview-container').innerHTML = '';
    this.querySelector('textarea').value = '';
    
    const messageConfirm = document.getElementById('message-sent');
    messageConfirm.style.display = 'block';
    
    setTimeout(() => {
        messageConfirm.style.display = 'none';
    }, 3000);
});

// Manejo de archivos
document.getElementById('photo-upload').addEventListener('change', handleFileSelect);
document.getElementById('video-upload').addEventListener('change', handleFileSelect);
document.getElementById('audio-upload').addEventListener('change', handleFileSelect);

// Grabación de audio
let mediaRecorder;
let audioChunks = [];
const recordButton = document.getElementById('record-audio');

recordButton.addEventListener('click', async () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                audioChunks = [];
                
                const previewContainer = document.getElementById('preview-container');
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';

                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(audioBlob);
                audio.controls = true;

                const removeButton = document.createElement('button');
                removeButton.className = 'remove-file';
                removeButton.innerHTML = '×';
                removeButton.onclick = () => previewContainer.removeChild(previewItem);

                previewItem.appendChild(audio);
                previewItem.appendChild(removeButton);
                previewContainer.appendChild(previewItem);

                // Detener todas las pistas del stream
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            recordButton.classList.add('recording');
            recordButton.textContent = '⏺';
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('No se pudo acceder al micrófono');
        }
    } else {
        mediaRecorder.stop();
        recordButton.classList.remove('recording');
        recordButton.textContent = '🎤';
    }
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const previewContainer = document.getElementById('preview-container');
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-file';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => previewContainer.removeChild(previewItem);

    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewItem.appendChild(img);
    } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = true;
        previewItem.appendChild(video);
    } else if (file.type.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.src = URL.createObjectURL(file);
        audio.controls = true;
        previewItem.appendChild(audio);
    }

    previewItem.appendChild(removeButton);
    previewContainer.appendChild(previewItem);
    event.target.value = ''; // Permite seleccionar el mismo archivo nuevamente
}

// Variables para manejo de medios
let mediaStream = null;
let videoRecorder = null;
const cameraFeed = document.getElementById('camera-feed');
const cameraPreview = document.querySelector('.camera-preview');
const takePhotoButton = document.getElementById('take-photo');
const recordVideoButton = document.getElementById('record-video');

// Función para iniciar la cámara
async function startCamera(videoOnly = true) {
    try {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
            video: true,
            audio: !videoOnly
        };
        
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraFeed.srcObject = mediaStream;
        cameraPreview.style.display = 'block';
        
        return true;
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('No se pudo acceder a la cámara');
        return false;
    }
}

// Captura de foto
takePhotoButton.addEventListener('click', async () => {
    if (!mediaStream && !(await startCamera(true))) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    canvas.getContext('2d').drawImage(cameraFeed, 0, 0);
    
    canvas.toBlob(blob => {
        addMediaPreview(blob, 'image');
        stopCamera();
    }, 'image/jpeg');
});

// Grabación de video
recordVideoButton.addEventListener('click', async () => {
    if (videoRecorder && videoRecorder.state === 'recording') {
        videoRecorder.stop();
        recordVideoButton.classList.remove('recording');
        recordVideoButton.textContent = '🎥';
        stopCamera();
        return;
    }
    
    if (!mediaStream && !(await startCamera(false))) return;
    
    try {
        videoRecorder = new MediaRecorder(mediaStream);
        const chunks = [];
        
        videoRecorder.ondataavailable = e => chunks.push(e.data);
        videoRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            addMediaPreview(blob, 'video');
        };
        
        videoRecorder.start();
        recordVideoButton.classList.add('recording');
        recordVideoButton.textContent = '⏹';
    } catch (error) {
        console.error('Error starting video recording:', error);
        alert('Error al iniciar la grabación de video');
    }
});

function stopCamera() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    cameraPreview.style.display = 'none';
}

function addMediaPreview(blob, type) {
    const previewContainer = document.getElementById('preview-container');
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';

    const element = document.createElement(type === 'image' ? 'img' : 'video');
    element.src = URL.createObjectURL(blob);
    if (type === 'video') element.controls = true;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-file';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => previewContainer.removeChild(previewItem);

    previewItem.appendChild(element);
    previewItem.appendChild(removeButton);
    previewContainer.appendChild(previewItem);
}

// Limpiar recursos al cerrar la página
window.addEventListener('beforeunload', () => {
    stopCamera();
});

// Initial update
updateCountdown();
updateSantaLocation();
