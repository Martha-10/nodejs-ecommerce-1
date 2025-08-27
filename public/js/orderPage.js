document.addEventListener("DOMContentLoaded", () => {
    // Actualizar enlace activo en el navbar
    const activeLink = document.querySelector('.active');
    if (activeLink) activeLink.classList.remove('active');
    const orderLink = document.querySelector('a[href="/hamburguers"]');
    if (orderLink) orderLink.classList.add('active');

    // Switch entre imágenes de productos
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (event) => {
            const imgElement = document.querySelector('.card-img');
            if (imgElement) imgElement.src = event.target.src;
        });
    });

    // Función para comprobar stock
    async function checkStock(size, id, quantity, e) {
        try {
            const response = await fetch(`/ajax/checkStock?size=${size}&id=${id}`);
            const data = await response.json();
            if (response.ok && quantity + 1 <= data.stock) {
                return true;
            } else {
                showPopover(e, 'focus', 'Not enough stock');
                return false;
            }
        } catch (error) {
            console.error('Error checking stock:', error);
            return false;
        }
    }

    // Función para mostrar popover
    function showPopover(element, trigger, message) {
        $(element).popover({
            trigger,
            animation: true,
            title: message,
            content: message
        }).popover('show');
        setTimeout(() => $(element).popover('hide'), 2200);
    }

    // Agregar producto
    const addButtons = document.querySelectorAll('.bi-caret-right-fill');
    addButtons.forEach(addBtn => {
        addBtn.addEventListener('click', async (e) => {
            const div = e.target.closest('[data-size][data-product]');
            const size = div.dataset.size;
            const id = div.dataset.product;
            const counter = document.querySelector(`#counter-${size}`);
            let quantity = parseInt(counter.textContent);
            
            const stockAvailable = await checkStock(size, id, quantity, e);
            if (stockAvailable) {
                counter.textContent = quantity + 1;
            }
        });
    });

    // Eliminar producto
    const removeButtons = document.querySelectorAll('.bi-caret-left-fill');
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', (e) => {
            const div = e.target.closest('[data-size][data-product]');
            const size = div.dataset.size;
            const counter = document.querySelector(`#counter-${size}`);
            let quantity = parseInt(counter.textContent);
            if (quantity > 0) {
                counter.textContent = quantity - 1;
            }
        });
    });

    // Agregar al carrito
    document.querySelector('#cartAdd').addEventListener('click', async () => {
        const id = document.querySelector('div[data-product]').dataset.product;
        const sizes = document.querySelectorAll('div[data-size]');
        const addToCart = [];
        
        sizes.forEach(size => {
            const quantity = parseInt(document.querySelector(`#counter-${size.dataset.size}`).textContent);
            if (quantity > 0) {
                addToCart.push({ id, size: size.dataset.size, quantity });
            }
        });

        const options = {
            trigger: 'manual',
            animation: true
        };

        if (addToCart.length > 0) {
            try {
                const response = await fetch('/ajax/addToCart', {
                    headers: { "Content-Type": "application/json" },
                    method: 'POST',
                    body: JSON.stringify({ addToCart })
                });
                if (response.ok) {
                    options.title = 'Great! 🍔';
                    options.content = 'Products added to the cart!';
                    $('#cartAdd').popover('dispose').popover(options).popover('show');
                    setTimeout(() => $('#cartAdd').popover('hide'), 2200);
                    $('span[id^="counter"]').text('0');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                options.title = 'Oops... ❌';
                options.content = 'Failed to add products to the cart';
                $('#cartAdd').popover('dispose').popover(options).popover('show');
                setTimeout(() => $('#cartAdd').popover('hide'), 2200);
            }
        } else {
            options.title = 'Oops... ❌';
            options.content = 'No product selected';
            $('#cartAdd').popover('dispose').popover(options).popover('show');
            setTimeout(() => $('#cartAdd').popover('hide'), 2200);
        }
    });
});
