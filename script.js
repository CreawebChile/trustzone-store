// Toggle Navbar Menu in Mobile View
function toggleMenu() {
    const navMenu = document.querySelector('.navbar ul');
    navMenu.classList.toggle('active');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    this.reset();
});
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            this.reset();
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        } else {
            alert('Hubo un problema al enviar el mensaje. Inténtalo más tarde.');
        }
    });
});
