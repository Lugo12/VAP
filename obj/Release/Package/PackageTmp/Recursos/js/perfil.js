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
                let flag = null;    //bandera par saber si los campos estan vacio
                $inputs.forEach(input => {
                    if (!input.value) flag = 1;
                })
                if (flag === null) {
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
                } else alert('Campos necesarios', 'Asegurate de no dejar ningun campo vacio', 'danger');    //campos vacios
            }
        });
        //información al cargar la página
        por_default();
    }, () => location.replace("../Default.aspx")))();
