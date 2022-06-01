import { ajax } from "./ajax.js";       //importando función para las peticiones ajax
import { alert } from "./alerta.js";        //importando función para las alertas personalizadas
import login from "./login.js";
//Evaluamos si hay un usuario logueado
(() => login(() => {
        document.querySelector('.perfil').classList.remove('oculto'); //mostramos el perfil
        const $editar = document.getElementById('editarPerfil');
        const $cancelar = document.getElementById('cancelarPerfil');
        const $guardar = document.getElementById('guardarPerfil');
        const $inputs = document.querySelectorAll('.input_perfil');
        const $labels = document.querySelectorAll('.label');
        //expresiones regulres
        const expresiones = {
            nombre: /^[a-zA-Z\u00C0-\u017F\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
            apellidos: /^[a-zA-Z\u00C0-\u017F\s]{3,30}$/, // Letras y espacios, pueden llevar acentos.
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            telefono: /^\d{8,10}$/ // 8 a 10 numeros.
        };
        //objeto para saber si se llenaron todos los campos
        const campos = {
            nombre: true,
            apellidos: true,
            password: true,
            correo: true,
            telefono: true
        };
        //Función para validar los campos
        const validarCampo = (expresion, input, campo) => {
            if (expresion.test(input.value)) {
                campos[campo] = true;
                input.classList.remove('input_bad');
            } else {
                campos[campo] = false;
                input.classList.add('input_bad');
                alert('Campo con informaci&oacute;n err&oacute;nea', 'Asegurate de escribir la informaci&oacute;n que corresponde al campo', 'danger');
            }
        };
        const validarFormulario = (e) => {
            if (Array.from($inputs).includes(e.target)) {
                switch (e.target.name) {
                    case 'nombre':
                        validarCampo(expresiones.nombre, e.target, 'nombre');
                        break;
                    case 'apellidos':
                        validarCampo(expresiones.apellidos, e.target, 'apellidos');
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
        //vista del perfil por default
        const por_default = () => {
            const cliente = JSON.parse(sessionStorage.getItem('cliente'));
            $inputs.forEach(input => {
                switch (input.id) {
                    case 'nombre':
                        input.value = cliente.txt_nombre_cliente;
                        break;
                    case 'apellidos':
                        input.value = cliente.txt_apellidos_cliente;
                        break;
                    case 'celular':
                        input.value = cliente.int_celular_cliente;
                        break;
                    case 'correo':
                        input.value = cliente.txt_correo_cliente;
                }
                input.classList.remove('input_bad');
            });
            $labels.forEach(label => {
                switch (label.id) {
                    case 'nombre_usuario':
                        label.textContent = cliente.txt_nombre_cliente;
                        break;
                    case 'apellidos_usuario':
                        label.textContent = cliente.txt_apellidos_cliente;
                        break;
                    case 'celular_usuario':
                        label.textContent = cliente.int_celular_cliente;
                        break;
                    case 'correo_usuario':
                        label.textContent = cliente.txt_correo_cliente;
                }
            });
            $editar.classList.remove('oculto');
            $cancelar.classList.add('oculto');
            $guardar.classList.add('oculto');
            $inputs.forEach((input) => input.classList.add('oculto'));
            $labels.forEach((label) => label.classList.remove('oculto'));
        };
        //Delegación del eveto keyup para los inputs 
        document.addEventListener('keyup', validarFormulario);
        //delegación del evento click en el boton editar, cancelar y guardar
        document.addEventListener('click', e => {
            if (e.target === $cancelar) por_default();
            else if (e.target === $editar) {
                $editar.classList.add('oculto');
                $cancelar.classList.remove('oculto');
                $guardar.classList.remove('oculto');
                $inputs.forEach((input) => input.classList.remove('oculto'));
                $labels.forEach((label) => label.classList.add('oculto'));
            } else if (e.target === $guardar) {
                if (
                    campos.nombre &&
                    campos.apellidos &&
                    campos.correo &&
                    campos.telefono
                ) {
                    let estado = "editado";
                    if (document.getElementById('correo_usuario').textContent === document.getElementById('correo').value) estado = "sin_editar";     //si el correo no cambio
                    const data = {
                        id: JSON.parse(sessionStorage.getItem('cliente')).id_cliente,
                        nombre: document.getElementById('nombre').value,
                        apellidos: document.getElementById('apellidos').value,
                        celular: document.getElementById('celular').value,
                        correo: document.getElementById('correo').value,
                        estado
                    }
                    ajax(
                        'POST',
                        'Perfil.aspx/EditCliente',
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
                                login(() => por_default());
                                alert('Informaci&oacute;n Guardada', 'El usuario se edito con &eacute;xito', 'success');
                            } else if (data === 'correo_existente') alert("Correo existente", "Ingresa un correo diferente", "primary");
                            else alert("Ocurrio un Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                        },
                        error => {
                            console.error(error);
                            alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                        }
                    )
                } else alert('Campos necesarios', 'Asegurate de no dejar ningun campo incorrecto', 'danger');    //campos vacios
            }
        });
        //información al cargar la página
        por_default();
    }, () => location.replace("../Default.aspx")))();
