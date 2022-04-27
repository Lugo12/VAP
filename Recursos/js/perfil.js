const $editar = document.getElementById('editarPerfil');
const $cancelar = document.getElementById('cancelarPerfil');
const $guardar = document.getElementById('guardarPerfil');
const $nombre = document.getElementById('nombre');
const $apellidos = document.getElementById('apellidos');
const $celular = document.getElementById('celular');
const $correo = document.getElementById('correo');
const $label_nombre = document.querySelector('.nombre_usuario');
const $label_apellidos = document.querySelector('.apellidos_usuario');
const $label_celular = document.querySelector('.celular_usuario');
const $label_correo = document.querySelector('.correo_usuario');
const $inputs = document.querySelectorAll('.input_perfil');
const $labels = document.querySelectorAll('.label');
//vista del perfil por default
const por_default = () => {     
    $editar.classList.remove('oculto');
    $cancelar.classList.add('oculto');
    $guardar.classList.add('oculto');
    $inputs.forEach((input) => input.classList.add('oculto'));
    $labels.forEach((label) => label.classList.remove('oculto'));
};
//vista del perfil al editar
$editar.addEventListener('click', () => {      
    $editar.classList.add('oculto');
    $cancelar.classList.remove('oculto');
    $guardar.classList.remove('oculto');
    $inputs.forEach((input) => input.classList.remove('oculto'));
    $labels.forEach((label) => label.classList.add('oculto'));
});
//boton cancelar
$cancelar.addEventListener('click', () => por_default());   
//boton guardar
$editar.addEventListener('submit', () => { });      
