const $mensaje = document.querySelector('.mensaje');
//función para ocultar el contenido
export const invisible = (head, body, mensaje) => {
    head.classList.add('oculto');
    body.classList.add('oculto');
    $mensaje.classList.remove('oculto');
    $mensaje.querySelector('h2').textContent = mensaje;
}
//función para mostrar el contenido
export const visible = (head, body) => {
    head.classList.remove('oculto');
    body.classList.remove('oculto');
    $mensaje.classList.add('oculto');
}