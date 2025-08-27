document.addEventListener("DOMContentLoaded", () => {
    // Actualizar enlace activo en el navbar
    const activeLink = document.querySelector('.active');
    if (activeLink) activeLink.classList.remove('active');
    const productLink = document.querySelector('a[href="/hamburguers"]');
    if (productLink) productLink.classList.add('active');

    // Cargar más productos (paginación)
    const loadBtn = document.querySelector('#loadBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', (e) => loadMoreProducts(e));
    }
});

// Función para cargar más productos
async function loadMoreProducts(e) {
    const loadBtn = e.target;
    let page = parseInt(loadBtn.dataset.page);

    try {
        const response = await fetch(`/ajax/loadPage?page=${page}`);
        if (response.ok) {
            const data = await response.text();
            if (!data.includes('false')) {
                appendProducts(data);
                loadBtn.dataset.page = page + 1;
            } else {
                loadBtn.innerText = 'No more products 😔';
                loadBtn.disabled = true;  // Deshabilitar el botón si no hay más productos
            }
        } else {
            console.error('Error al cargar la página:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud de carga de productos:', error);
    }
}

// Función para agregar productos al DOM
function appendProducts(data) {
    let parser = new DOMParser();
    let append = parser.parseFromString(data, 'text/html');
    const productsList = document.querySelector('#productsList');
    if (productsList) {
        for (let child of append.body.childNodes) {
            productsList.appendChild(child);
        }
    }
}
