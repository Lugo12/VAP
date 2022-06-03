import { ajax } from './ajax.js';       //importando funcion ajax
import { alert } from './alerta.js';       //importando funcion alert
import login from './login.js';     //validaci�n de usuario logueado
const $aside = document.querySelector('.aside');
const $toggle = document.querySelector('.toggler');
const $btn_lupa2 = document.querySelector('.lupa2');
const $busqueda = document.getElementById('input_busqueda');
const $btn_lupa = document.querySelector('.lupa');
const $scrollBtn = document.querySelector('.scroll-top-btn');
const $modal = new bootstrap.Modal(document.getElementById('modal_main'));
//funci�n para eviar informaci�n de la busqueda al servidor
const busqueda = () => {
    if ($busqueda.value) {
        const data = {
            busqueda: $busqueda.value
        }
        ajax(
            'POST',
            'Default.aspx/SetBusqueda',
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
//delegaci�n del evento keydown en el document para la busqueda
document.addEventListener('keydown', e => {
    if (e.target === $busqueda) {
        if (e.keyCode === 13) busqueda();
    }
});
//Evento para cuado se haga scroll en la ventana
window.addEventListener('scroll', e => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTo;
    //mostramos el bot�n para hacer scroll
    if (scrollTop > 600) $scrollBtn.classList.remove('invisible');
    else $scrollBtn.classList.add('invisible');
});
//funcion para mostrar existencias en el carrito
(() => document.getElementById('no_carrito').textContent = localStorage.length)();
//MAIN MODAL
const inputs = Array.from(document.querySelectorAll('.formulario__input'));
//expresiones regulres
const expresiones = {
    nombre: /^[a-zA-Z\u00C0-\u017F\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
    apellidos: /^[a-zA-Z\u00C0-\u017F\s]{3,30}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos-.
    correo: /^[a-zA-Z0-9_.+-\u00f1\u00d1]+@[a-zA-Z0-9-\u00f1\u00d1]+\.[a-zA-Z0-9-.\u00f1\u00d1]+$/,
    telefono: /^\d{8,10}$/ // 8 a 10 numeros.
};
//objeto para saber si se llenaron todos los campos
const campos = {
    nombre: false,
    apellidos: false,
    password: false,
    password2: false,
    correo: false,
    telefono: false
};
//Funci�n para validar los campos
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};
//Funci�n para validar las contrase�as
const validarPassword2 = () => {
    const inputPass1 = document.getElementById('password');
    const inputPass2 = document.getElementById('password2');
    if (inputPass1.value !== inputPass2.value) {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-check');
        document
            .querySelector(`#grupo__password2 .formulario__input-error`)
            .classList.add('formulario__input-error-activo');
        campos['password2'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-check');
        document
            .querySelector(`#grupo__password2 .formulario__input-error`)
            .classList.remove('formulario__input-error-activo');
        campos['password2'] = true;
    }
};
//Funci�n para validar formulario
const validarFormulario = (e) => {
    if (inputs.includes(e.target)) {
        switch (e.target.name) {
            case 'nombre':
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case 'apellidos':
                validarCampo(expresiones.apellidos, e.target, 'apellidos');
                break;
            case 'password':
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
                break;
            case 'password2':
                validarPassword2();
                break;
            case 'correo':
                validarCampo(expresiones.correo, e.target, 'correo');
                break;
            case 'telefono':
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
        }
    }
};
//Delegaci�n del eveto keyup para los inputs 
document.addEventListener('keyup', validarFormulario);
//Asignaci�n del eveto blur para los inputs
inputs.forEach((input) => {
    input.addEventListener('blur', validarFormulario);
});
//Reiniciamos el login y el registro
const limpiarModal = () => {
    inputs.forEach(input => {
        input.value = "";
        if (input.classList.contains('registro')) {
            input.parentNode.parentNode.classList.remove('formulario__grupo-incorrecto');
            input.parentNode.parentNode.classList.remove('formulario__grupo-correcto');
            input.parentNode.nextElementSibling.classList.remove('formulario__input-error-activo');
        }
    })
    document.getElementById('passwordL').setAttribute('type', 'password');
    document.querySelector('.formulario__validacion-estado-ojo').classList.add('fa-eye');
    document.querySelector('.formulario__validacion-estado-ojo').classList.remove('fa-eye-slash');
}
//delegaci�n del evento click 
document.addEventListener('click', e => {
    if (e.target === $scrollBtn) {
        //boton de scroll
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    } else if (e.target === $btn_lupa) busqueda();
    else if (e.target === $btn_lupa2) {
        //lupa responsiva
        document.querySelector('.botones_izq').classList.toggle('oculto');
        document.querySelector('.botones_der').classList.toggle('oculto');
        document.querySelector('.busqueda').classList.toggle('busqueda_focus');
        document.querySelector('.busqueda_responsive').classList.toggle('bus_res_focus');
        $btn_lupa2.classList.toggle('lupa2_focus');
        document.querySelector('header').classList.toggle('header_responsive');
    } else if (e.target === $toggle) $aside.classList.toggle('activo') //aside activo
    else if (e.target === document.getElementById('a_login')) {
        login(() => alert('FBI', 'We are coming for you...', 'danger'), () => $modal.show())    //modal principal - login
    } else if (e.target === document.querySelector('.fa-eye')) {
        //ojito activado para ver contrase�a
        document.getElementById('passwordL').setAttribute('type', 'text');
        document.querySelector('.formulario__validacion-estado-ojo').classList.remove('fa-eye');
        document.querySelector('.formulario__validacion-estado-ojo').classList.add('fa-eye-slash');
    } else if (e.target === document.querySelector('.fa-eye-slash')) {
        //ojito activado para no ver la contrase�a
        document.getElementById('passwordL').setAttribute('type', 'password');
        document.querySelector('.formulario__validacion-estado-ojo').classList.add('fa-eye');
        document.querySelector('.formulario__validacion-estado-ojo').classList.remove('fa-eye-slash');
    } else if (e.target === document.querySelector('.btn_registro')) {
        //cuando se da click en el bot�n registro
        if (
            campos.nombre &&
            campos.apellidos &&
            campos.password &&
            campos.password2 &&
            campos.correo &&
            campos.telefono
        ) {
            const data = {};
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
            inputs.forEach(input => {
                switch (input.name) {
                    case 'nombre':
                        data.nombre = input.value;
                        break;
                    case 'apellidos':
                        data.apellidos = input.value;
                        break;
                    case 'password':
                        data.password = input.value;
                        break;
                    case 'correo':
                        data.correo = input.value;
                        break;
                    case 'telefono':
                        data.telefono = input.value;
                        break;
                }
            });
            ajax(
                'POST',
                'Default.aspx/SetCliente',
                JSON.stringify(data),
                data => {
                    if (data[0].id_cliente) {
                        const cliente = {
                            id_cliente: data[0].id_cliente,
                            txt_nombre_cliente: data[0].txt_nombre_cliente,
                            txt_apellidos_cliente: data[0].txt_apellidos_cliente,
                            int_celular_cliente: data[0].int_celular_cliente,
                            txt_correo_cliente: data[0].txt_correo_cliente
                        }
                        sessionStorage.setItem('cliente', JSON.stringify(cliente));
                        location.reload();
                    } else if (data === "correo_existente") alert("Usuario registrado", "El correo ya ha sido registrdo", "primary");
                    else {
                        limpiarModal();
                        console.log(data);
                        alert("Ocurrio un error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                    }
                },
                error => {
                    console.error(error);
                    alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                }
            )
        } else {
            inputs.forEach(input => {
                if (input.classList.contains('registro') && input.value == "")
                    input.parentNode.parentNode.classList.add('formulario__grupo-incorrecto');
            })
            alert("Campos necesarios", "Porfavor llena todos los campos de forma correcto", "danger");
        }
    } else if (e.target === document.querySelector('.btn_login')) {
        //cuando se da click en el bot�n login
        const $correoL = document.getElementById('correoL');
        const $passwordL = document.getElementById('passwordL');
        if ($correoL.value && $passwordL.value) {
            const data = {
                correo: $correoL.value,
                password: $passwordL.value
            }
            ajax(
                'POST',
                'Default.aspx/GetCliente',
                JSON.stringify(data),
                data => {
                    if (data[0].id_cliente) {
                        const cliente = {
                            id_cliente: data[0].id_cliente,
                            txt_nombre_cliente: data[0].txt_nombre_cliente,
                            txt_apellidos_cliente: data[0].txt_apellidos_cliente,
                            int_celular_cliente: data[0].int_celular_cliente,
                            txt_correo_cliente: data[0].txt_correo_cliente
                        }
                        sessionStorage.setItem('cliente', JSON.stringify(cliente));
                        location.reload();
                    } else if (data === "password_error") alert("Contrase&ntilde;a Incorrecta", "Ingresa la contrase&ntilde;a correcta", "primary");
                    else if (data === "correo_error") alert("Usuario sin registrar", "El correo no ha sido registrdo", "primary");
                    else {
                        limpiarModal();
                        console.log(data);
                        alert("Ocurrio un error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                    }
                },
                error => {
                    console.error(error);
                    alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                }
            )
        } else alert("Campos necesarios", "Porfavor llena todos los campos", "danger");
    } else if (e.target === document.querySelector('.sign-off')) {
        //Click en el bot�n para cerrar sesi�n
        sessionStorage.clear();
        location.replace("../Default.aspx");
    } else if (!Array.from(document.querySelectorAll('.aside_links')).includes(e.target)
        && e.target !== $toggle && e.target !== $aside
        && $aside.classList.contains('activo')) $aside.classList.remove('activo');      //aside desactivado
});
//evento de cierre del modal
document.getElementById('modal_main').addEventListener('hidden.bs.modal', limpiarModal);
//funci�n para comprobar si existe un cliente logueado
(() => login())();