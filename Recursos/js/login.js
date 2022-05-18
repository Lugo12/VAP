import { alert } from './alerta.js';
import { ajax } from './ajax.js';
export default (success = () => { }, reject = () => { }) => {
    const on_session = Array.from(document.querySelectorAll('.on-session'));
    const login = document.getElementById('a_login');
    if (sessionStorage.getItem('cliente')) {
        const data = {
            correo: JSON.parse(sessionStorage.getItem('cliente')).txt_correo_cliente
        }
        ajax(
            'POST',
            'Default.aspx/ExistCliente',
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
                    on_session.forEach(a => a.classList.remove('oculto'));
                    login.classList.add('oculto');
                    success()
                } else if (data === "No") {
                    console.error(error);
                    alert('Error', 'Se alteraron los datos de la sesión', 'danger');
                } else {
                    console.error(error);
                    alert('Ocurrio un error', 'No se pudo iniciar sesi&oacute;n satisfactoriamente', 'danger');
                }
            },
            error => {
                console.error(error);
                alert('Error', 'No se pudo iniciar sesi&oacute;n satisfactoriamente', 'danger');
            }
        )
    } else {
        on_session.forEach(a => a.classList.add('oculto'));
        login.classList.remove('oculto');
        reject();
    }
}