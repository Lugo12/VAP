const aside = document.querySelector('.aside');
const toggle = document.querySelector('.toggler');
const lupa2 = document.querySelector('.lupa2');
toggle.addEventListener('click', () => aside.classList.toggle('activo'));       //aside activo
toggle.addEventListener('blur', () => aside.classList.remove('activo'));        //aside desactivado
//funcionalidad de la lupa secundaria en dispositivos mobiles
lupa2.addEventListener('click', () => {
  document.querySelector('.botones_izq').classList.toggle('oculto');
  document.querySelector('.botones_der').classList.toggle('oculto');
  document.querySelector('.busqueda').classList.toggle('busqueda_focus');
  document.querySelector('.busqueda_responsive').classList.toggle('bus_res_focus');
  lupa2.classList.toggle('lupa2_focus');
  document.querySelector('header').classList.toggle('header_responsive');
});
//funcion para mostrar existencias en el carrito
(() => document.getElementById('no_carrito').textContent = localStorage.length)();