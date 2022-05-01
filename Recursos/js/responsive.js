import { ajax } from './ajax.js';       //importando funcion ajax
import { alert } from './alerta.js';       //importando funcion alert
const $aside = document.querySelector('.aside');
const $toggle = document.querySelector('.toggler');
const $btn_lupa2 = document.querySelector('.lupa2');
const $busqueda = document.getElementById('input_busqueda');
const $btn_lupa = document.querySelector('.lupa');
const $scrollBtn = document.querySelector('.scroll-top-btn');
//función para eviar información de la busqueda al servidor
const busqueda = () => {
    if ($busqueda.value) {
        const data = {
            busqueda: $busqueda.value
        }
        ajax(
            'POST',
            'Default.aspx/GetBusqueda',
            JSON.stringify(data),
            data => {
                if (data) location.href = "../Default.aspx";
                else alert("Ocurrio un error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
            },
            error => {
                console.error(error);
                alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
            }
        )
    } else alert("&#191;Qu&eacute; buscas?", "Asegurate de escribir primero antes de buscar", "warning");
}
//Evento blur para el toggle
$toggle.addEventListener('blur', () => $aside.classList.remove('activo'));  //aside desactivado
//delegación del evento keydown en el document para la busqueda
document.addEventListener('keydown', e => {
    if (e.target === $busqueda) {
        if (e.keyCode === 13) busqueda();
    }
});
//Evento para cuado se haga scroll en la ventana
window.addEventListener('scroll', e => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTo;
    //mostramos el botón para hacer scroll
    if (scrollTop > 600) $scrollBtn.classList.remove('invisible');
    else $scrollBtn.classList.add('invisible');
});
//delegación del evento click en el document para el boton de busqueda, el boton de scroll, la lupa2 y el toggle 
document.addEventListener('click', e => {
    if (e.target === $scrollBtn) {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    } else if (e.target === $btn_lupa) busqueda();
    else if (e.target === $btn_lupa2) {
        document.querySelector('.botones_izq').classList.toggle('oculto');
        document.querySelector('.botones_der').classList.toggle('oculto');
        document.querySelector('.busqueda').classList.toggle('busqueda_focus');
        document.querySelector('.busqueda_responsive').classList.toggle('bus_res_focus');
        $btn_lupa2.classList.toggle('lupa2_focus');
        document.querySelector('header').classList.toggle('header_responsive');
    } else if (e.target === $toggle) $aside.classList.toggle('activo') //aside activo
});
//funcion para mostrar existencias en el carrito
(() => document.getElementById('no_carrito').textContent = localStorage.length)();