document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los inputs de tipo text con name que comienzan con 'numeros'
    const textInputs = document.querySelectorAll('input[type="text"][name^="numeros"]');

    textInputs.forEach(function(input) {
        const errorSpan = document.querySelector(`span#${input.name}`);

        input.addEventListener('input', function () {
            const isValid = validarNumeros(input.value);

            if (!isValid) {
                errorSpan.textContent = 'Solo se permiten caracteres numéricos y puntos.';
                input.setCustomValidity('Entrada no válida'); // Establece el mensaje de error de validación
            } else {
                errorSpan.textContent = ''; // Limpia cualquier mensaje de error
                input.setCustomValidity(''); // Limpia la validez personalizada
            }
        });
    });
});

function validarNumeros(value) {
    // Expresión regular para números enteros positivos y números decimales
    const regex = /^\d*\.?\d*$/;
    return regex.test(value);
}
