import { ajax } from "./ajax.js";       //importando función para las peticiones ajax
import { alert } from "./alerta.js";        //importando función para las alertas personalizadas
import login from "./login.js";
import { invisible, visible } from "./vista.js";
//Evaluamos si el cliente esta logueado, si no, lo regresamos al catalogo
(() => login(() => {
    const $head = document.querySelector('.head_pedido_cliente');
    const $body = document.querySelector('.body_pedido_cliente');
    let values = null;
    //Renderizmos pedidos
    const renderPedidos = (data) => {
        $body.innerHTML = "";       //reinicio de la vista
        const pedidos = [];
        const $template_pedido = document.getElementById('template_pedidos_cliente').content,
            $fragment = document.createDocumentFragment();
        //por cada pedido filtrmos y almacenamos un clon 
        data.forEach(producto => {
            let flag = null;
            if (pedidos.length > 0) {
                pedidos.forEach(pedido => {
                    if (producto.id_pedido === pedido.id_pedido) flag = 1;
                })
                if (flag) return;
                pedidos.push(producto);
            } else pedidos.push(producto);
            let color_pedido = null, estado = null;
            switch (producto.txt_estado_pedido) {
                case 'cancelado':
                    color_pedido = "bg-danger";
                    break;
                case 'entregado':
                    color_pedido = "bg-success";
                    break;
                case 'enviado':
                    color_pedido = "bg-warning";
                    break;
                case 'empacado':
                    color_pedido = "bg-dark";
                    estado = 1;
                    break;
                case 'pendiente':
                    color_pedido = "bg-info";
                    estado = 1;
                    break;
            }
            $template_pedido.querySelector('.pedido_pedidos').classList.add(color_pedido);
            $template_pedido.querySelector('.header_pedido').textContent = `Pedido #${producto.id_pedido}`;
            $template_pedido.querySelector('#fecha_pp').textContent = `Fecha: ${producto.d_fecha_pedido.substring(0,10)}`;
            $template_pedido.querySelector('#total_pp').textContent = `Total: $MXN${producto.dec_total_pedido}`;
            $template_pedido.querySelector('#estado_pp').textContent = `Estado: ${producto.txt_estado_pedido}`;
            $template_pedido.querySelector('.pedido_pedidos').dataset.id = producto.id_pedido;
            $template_pedido.querySelector('.detalles_pedido_btn').dataset.id = producto.id_pedido;
            //agregamos boton para cancelar en caso de que el estado del pedido sea igual a "pendiente" o "empacado"
            const $acciones = $template_pedido.querySelector('.acciones_pedido');
            if (estado) {
                const cancelarBtn = document.createElement('button');
                cancelarBtn.classList.add('boton', 'cancelar_pedido_btn', 'btn');
                cancelarBtn.setAttribute('type', 'button');
                cancelarBtn.setAttribute('data-bs-toggle', 'modal');
                cancelarBtn.setAttribute('data-bs-target', '#modal_cancel');
                cancelarBtn.textContent = "Cancelar";
                cancelarBtn.dataset.idPedido = producto.id_pedido;
                cancelarBtn.dataset.idCliente = producto.id_cliente;
                $acciones.appendChild(cancelarBtn);
            }
            let $clone = document.importNode($template_pedido, true);  //creamos un clon del template y le asegnamos valores a sus atributos
            $fragment.appendChild($clone);      //agregamos el template a un fragmento
            $template_pedido.querySelector('.pedido_pedidos').classList.remove(color_pedido);
            if (estado) $acciones.removeChild($acciones.lastChild);
        });
        $body.appendChild($fragment);       //agregamos el fragmento a la vista
    }
    //Función para rellenar el modal con los detalles
    const detallesPedidos = (target) => {
        const $template_detalles = document.getElementById('template_pedidos_cliente_detalles').content,
            $fragment = document.createDocumentFragment(),
            $modal_body = document.querySelector('.body_modal_pedidos');
        $modal_body.innerHTML = "";
        values.forEach(pedido => {
            if (target.dataset.id == pedido.id_pedido) {
                document.getElementById('titulo_modal_pedidos').textContent = `Pedido #${pedido.id_pedido}`;
                $template_detalles.querySelector('#imagen_pp').src = (() => pedido.txt_color_prenda === 'negro' ? pedido.img_negro_prenda : pedido.img_blanco_prenda)();
                $template_detalles.querySelector('#tipo_pp').textContent = `Tipo: ${pedido.txt_tipo_prenda}`;
                $template_detalles.querySelector('#marca_pp').textContent = `Marca: ${pedido.txt_marca_prenda}`;
                $template_detalles.querySelector('#precio_pp').textContent = `Precio: $MXN${pedido.dec_precio_prenda}`;
                $template_detalles.querySelector('#color_pp').textContent = `Color: ${pedido.txt_color_prenda}`;
                $template_detalles.querySelector('#talla_pp').textContent = `Talla: ${pedido.txt_talla_prenda}`;
                $template_detalles.querySelector('#cantidad_pp').textContent = `Cantidad: ${pedido.int_cantidad_subpedido}`;
                let $clone = document.importNode($template_detalles, true);  //creamos un clon del template y le asegnamos valores a sus atributos
                $fragment.appendChild($clone);      //agregamos el template a un fragmento
            }
        });
        $modal_body.appendChild($fragment);
    }
    //Función para pedir pedidos
    const peticionPedidos = () => {
        //Id del cliente logueado
        const data = {
            id_cliente: JSON.parse(sessionStorage.getItem('cliente')).id_cliente
        }
        //Solicitamos los pedidos del cliente actual
        ajax(
            'POST',
            'PedidosCliente.aspx/GetPedidos',
            JSON.stringify(data),
            data => {
                if (!data.ClassName) {
                    if (data.length > 0) {
                        //Si hay pedidos
                        visible($head, $body);  //mostramos el contenido
                        values = data.slice();
                        renderPedidos(values);
                    } else invisible($head, $body, "Parece que aún no has pedido nada...");    //ocultamos el contenido si no hay pedidos
                } else alert("Ocurrio un Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger"); //Si ocurrió una excepción               
            },
            error => {
                console.error(error);
                alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
            }
        )
    }
    peticionPedidos();  //Pedimos los pedidos al cargar la página
    //Delegación del evento click
    document.addEventListener('click', e => {
        const $btnCancelarPedido = document.getElementById('cancelarPedido');
        if (Array.from(document.querySelectorAll('.detalles_pedido_btn')).includes(e.target)) detallesPedidos(e.target);
        else if (Array.from(document.querySelectorAll('.cancelar_pedido_btn')).includes(e.target)) {
            document.getElementById('mensajeCancelacion').textContent = `¿Estás seguro de eliminar el pedido #${e.target.dataset.idPedido}`;
            $btnCancelarPedido.dataset.idCliente = e.target.dataset.idCliente;
            $btnCancelarPedido.dataset.idPedido = e.target.dataset.idPedido;
        } else if (e.target === $btnCancelarPedido) {
            const data = {
                idCliente: $btnCancelarPedido.dataset.idCliente,
                idPedido: $btnCancelarPedido.dataset.idPedido
            }
            ajax(
                'POST',
                'PedidosCliente.aspx/DelPedido',
                JSON.stringify(data),
                data => {
                    if (data) {
                        peticionPedidos();
                        alert("Pedido Cancelado", "Tu pedido se cancelo con &eacute;xito", "info");
                    } else alert("Ocurrio un error", "Tu pedido no se cancelo, intentalo m&aacute;s tarde", "danger");
                },
                error => {
                    console.error(error);
                    alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                }
            )
        }
    });
}, () => location.replace("../Default.aspx")))();