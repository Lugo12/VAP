//función para mostrar alerta personalizada
export const alert = (cabecera, mensaje, tipo) => {
    const $alerta = document.getElementById('alerta');
    $alerta.innerHTML = `
     <div class="alert alert-dismissible alert-${tipo}">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <h4 class="alert-heading">${cabecera}</h4>
        ${mensaje}
    </div>
    `;
    $alerta.classList.remove('oculto'); //mostramos alerta
    setTimeout(() => {
        $alerta.classList.add('oculto');
        $alerta.innerHTML = "";
    }, 4000);  //desaparecemos alerta despues de 4 segundos
};