document.addEventListener("DOMContentLoaded", () => {
    // Elementos de imagen que necesitan el evento 'change'
    const imageInputs = ['#img1', '#img2', '#img3'];

    imageInputs.forEach(imgId => {
        const imgElement = document.querySelector(imgId);
        if (imgElement) {
            imgElement.addEventListener('change', (e) => checkBox(e));
        } else {
            console.warn(`Elemento con id ${imgId} no encontrado.`);
        }
    });
});

// Función para manejar la selección de la imagen
function checkBox(e) {
    const checkbox = document.querySelector(`input[name="${e.target.id}"]`);
    if (checkbox) {
        checkbox.checked = true;
        checkbox.value = 'on';
    } else {
        console.warn(`Checkbox con name="${e.target.id}" no encontrado.`);
    }
}
