function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        menuIcon.classList.remove('active');
    } else {
        menu.style.display = 'flex';
        menuIcon.classList.add('active');
    }
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#nav-menu a');
    const menu = document.getElementById('nav-menu');
    const menuIcon = document.querySelector('.menu-icon');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menu.style.display = 'none';
                menuIcon.classList.remove('active');
            }
        });
    });

    // Cerrar menú al redimensionar la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
            menuIcon.classList.remove('active');
        }
    });
}); 