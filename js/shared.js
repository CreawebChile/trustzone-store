function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    
    menu.classList.toggle('active');
    menuIcon.setAttribute('aria-expanded', 
        menuIcon.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    );
    
    if (menu.classList.contains('active')) {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
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