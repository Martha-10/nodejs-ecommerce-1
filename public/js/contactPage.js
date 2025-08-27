document.addEventListener("DOMContentLoaded", () => {
    // Intentar encontrar el enlace activo actual y quitar la clase 'active' si existe
    const activeLink = document.querySelector('.active');
    if (activeLink) {
        activeLink.classList.remove('active');
    }

    // Intentar encontrar el enlace de contacto y agregar la clase 'active'
    const contactLink = document.querySelector('a[href="/contact"]');
    if (contactLink) {
        contactLink.classList.add('active');
    } else {
        console.warn('Enlace de contacto no encontrado.');
    }
});
