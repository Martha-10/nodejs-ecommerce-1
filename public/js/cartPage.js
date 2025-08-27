// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Actualizar enlace activo en el navbar
    const activeLink = document.querySelector('.active');
    if (activeLink) activeLink.classList.remove('active');
    const burgerLink = document.querySelector('a[href="/hamburguers"]');
    if (burgerLink) burgerLink.classList.add('active');

    // Función común para actualizar el carrito y el total
    function updateProductInCart(id, size, quantity, operation) {
        updateCart({ id, size, quantity });
        updateTotal(id, size, quantity, operation);
    }

    // Función para manejar el botón de añadir producto
    const addButtons = document.querySelectorAll('.bi-caret-right-fill');
    addButtons.forEach(addBtn => {
        addBtn.addEventListener('click', async (e) => {
            const div = e.target.closest('[data-size][data-product]');
            const size = div.dataset.size;
            const id = div.dataset.product;
            const counter = document.querySelector(`#counter-${size}${id}`);
            let quantity = parseInt(counter.textContent, 10);

            if (isNaN(quantity)) {
                console.error('Cantidad inválida');
                return;
            }

            try {
                const response = await fetch(`/ajax/checkStock?size=${size}&id=${id}`);
                if (!response.ok) {
                    throw new Error('Error al verificar stock');
                }
                const data = await response.json();
                if (quantity + 1 <= data.stock) {
                    quantity++;
                    counter.textContent = quantity;
                    updateProductInCart(id, size, quantity, 'add');
                }
            } catch (error) {
                console.error(error);
                // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
            }
        });
    });

    // Función para manejar el botón de eliminar producto
    const removeButtons = document.querySelectorAll('.bi-caret-left-fill');
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', (e) => {
            const div = e.target.closest('[data-size][data-product]');
            const size = div.dataset.size;
            const id = div.dataset.product;
            const counter = document.querySelector(`#counter-${size}${id}`);
            let quantity = parseInt(counter.textContent, 10);

            if (isNaN(quantity)) {
                console.error('Cantidad inválida');
                return;
            }

            if (quantity > 0) {
                quantity--;
                counter.textContent = quantity;
                updateProductInCart(id, size, quantity, 'remove');
            }
        });
    });

    // Función para actualizar el carrito
    async function updateCart(modifiedProduct) {
        try {
            const response = await fetch('/ajax/updateCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updateProduct: modifiedProduct }),
            });
            if (!response.ok) {
                throw new Error("Error al actualizar el carrito");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Función para actualizar el total del carrito
    function updateTotal(id, size, quantity, operation) {
        const priceElement = document.querySelector(`#unityPrice-${size}${id}`);
        if (!priceElement) {
            console.error('Elemento de precio no encontrado');
            return;
        }

        const price = parseFloat(priceElement.textContent);
        const subTotal = document.querySelector(`#totalPrice-${size}${id}`);
        const total = document.querySelector(`#cartTotal`);

        if (subTotal) {
            subTotal.textContent = (price * quantity).toFixed(2);
        } else {
            console.error('Elemento de subtotal no encontrado');
        }

        const currentTotal = parseFloat(total.textContent) || 0;

        switch (operation) {
            case 'add':
                total.textContent = (currentTotal + price).toFixed(2);
                if (currentTotal === 0) {
                    document.querySelector('input[value="Checkout"]').disabled = false;
                }
                break;
            case 'remove':
                total.textContent = (currentTotal - price).toFixed(2);
                if (parseFloat(total.textContent) <= 0) {
                    document.querySelector('input[value="Checkout"]').disabled = true;
                }
                break;
            default:
                console.error(`Operación no válida: ${operation}`);
                break;
        }
    }

});
