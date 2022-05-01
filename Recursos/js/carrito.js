import { ajax } from './ajax.js';       //importando funcion ajax
import { alert } from './alerta.js';       //importando funcion alert
import { visible, invisible } from './vista.js';       //importando funcion de la vista
import { tooltip } from './tooltip.js';       //importando funcion de los tooltip
(function () {
    const $head = document.querySelector('.head_carrito'),
        $body = document.querySelector('.body_carrito');
    //función para cuando el carrito esta vacio
    const vacio = () => invisible($head, $body, "Tu carrito se ve muy vacio... ¿Qué tal si agregamos algo?");
    //función para cuando el carrito tiene elementos
    const cargado = () => visible($head, $body);
    //Validamos que existan productos para mostrar en el carrito
    if (localStorage.length > 0) {
        const $btnPedido = document.createElement('button');   //boton para enviar el carrito al servidor
        const $totalCarrito = document.createElement('h2');   //boton para enviar el carrito al servidor
        let totalCarrito = null;
        //le damos atributos al boton de realizar pedido
        $btnPedido.setAttribute("type", "button");
        $btnPedido.setAttribute("id", "btn_Pedido");
        $btnPedido.classList.add('boton', 'btn', 'btn_pedido');
        $btnPedido.textContent = "Realizar Pedido";
        //le damos atributos al h2 del total del carrit
        $totalCarrito.classList.add('total_carrito');
        cargado();  //mostramos el catalogo
        //función para calcular el total del carrito
        const calcTotal = () => {
            totalCarrito = null;
            values.forEach(producto => {
                if (!producto.int_carrito) totalCarrito += producto.dec_precio_prenda;
                else totalCarrito += producto.dec_precio_prenda * producto.int_carrito;
            });
            return totalCarrito;
        }
        //función para pintar los productos en el carrito
        const renderCarrito = (data) => {
            $body.innerHTML = "";   //limpiamos el contenido del body
            if (data.length > 0) {
                const $template = document.getElementById('template_carrito').content,
                    $fragment = document.createDocumentFragment();
                //por cada producto existente usamos un template 
                data.forEach(producto => {
                    $template.querySelector('.acciones_carrito').dataset.id = producto.variantes_producto.txt_id_variante;
                    $template.querySelector('.header_carrito').textContent = `${producto.txt_tipo_prenda} - ${producto.txt_marca_prenda}`;
                    $template.querySelector('.image_carrito').querySelector('img').src = (() => {
                        if (producto.variantes_producto.txt_color_prenda === 'negro') return `${producto.img_negro_prenda}`;
                        else return `${producto.img_blanco_prenda}`
                    })();   //validamos que color de prenda se escogio
                    $template.querySelector('.precio_carrito').textContent = `$MXN${producto.dec_precio_prenda}`;
                    $template.querySelector('.texto_carrito').textContent = `Talla: ${producto.variantes_producto.txt_talla_prenda}`;
                    //validamos el numero de unidades de un producto
                    if (producto.int_carrito && producto.int_carrito !== 1) {
                        $template.querySelector('.cantidad_carrito').textContent = `Cantidad: ${producto.int_carrito}`;
                        $template.querySelector('.del_All').classList.remove('oculto');
                    } else {
                        $template.querySelector('.cantidad_carrito').textContent = "Cantidad: 1";
                        $template.querySelector('.del_All').classList.add('oculto');
                    }
                    let $clone = document.importNode($template, true);  //creamos un clon del template y le asegnamos valores a sus atributos
                    $fragment.appendChild($clone);      //agregamos el template a un fragmento
                });
                $totalCarrito.textContent = `Total: $MXN${calcTotal()}`;
                $fragment.appendChild($totalCarrito);  //agregamos el total del carrito
                $fragment.appendChild($btnPedido);  //agregamos el boton de realizar pedido               
                $body.appendChild($fragment);       //agregamos el fragmento a la vista
                tooltip(); //funcion para activar los tooltip
            } else vacio();
        }
        //funcion para asociar la key en el localStorage con el producto
        const associateKey = (data, key) => {
            data.llaveLS = [key];
            return data;
        }
        const keys = [];    //llaves de los items en el localStorage
        const values = [];  //valores de los items en el localStorage
        for (let key = 0; key < localStorage.length; key++) keys.push(localStorage.key(key)); //trames las llaves en el arreglo keys
        keys.forEach(key => {
            const producto = JSON.parse(localStorage.getItem(key)); //por cada llave traemos el valor relacinado con la misma
            //si es la primera vez se empuja al arreglo de valores
            if (values.length > 0) {
                let flag = false;
                for (let valor of values) {
                    //if el id del objeto que hay en valores es igual a otro objeto en el local storage se agrega un atributo
                    if (valor.variantes_producto.txt_id_variante === producto.variantes_producto.txt_id_variante) {
                        if (valor.int_carrito) ++valor.int_carrito //agregamos una unidad por cada producto repetido
                        else valor.int_carrito = 2; //en caso de ser la primera vez asignamos un 2 en señal de que ya hay minimo 2 prendas iguales
                        valor.llaveLS.push(key);
                        flag = true;    //bandera para saber si se encontro una coincidencia
                    }
                }
                if (!flag) values.push(associateKey(producto, key));    //empujamos el elemento en caso de que no se haya encontrado una coincidencia
            } else values.push(associateKey(producto, key));    //empujamos al arreglo si es que es el primer producto
        });
        renderCarrito(values);  //mostramos el carrito en la vista
        //delegación del evento click en el carrito
        document.addEventListener('click', e => {
            const $btn_del = Array.from($body.querySelectorAll('.del'));
            const $btn_del_All = Array.from($body.querySelectorAll('.del_All'));
            const update_carrito = (values, producto, eliminado = true) => {
                if (eliminado) values.splice(values.indexOf(producto), 1); //se borra el producto del arreglo                
                renderCarrito(values)   //se vuelve a renderizar el carrito
                document.querySelector('.tooltip').remove();    //correción para un bug con los tooltip
                document.getElementById('no_carrito').textContent = localStorage.length;    //se restablece la cantidad de elementos en el carrito
            }
            if (e.target === document.getElementById('btn_Pedido')) {
                const $loginModal = document.getElementById('loginModal');
                if (cliente) {
                    //información que se va a enviar al servidor
                    const data = {
                        productos: values,
                        total: totalCarrito,
                        cliente: cliente.id
                    }
                    //funcion ajax para traer productos a la vista
                    ajax(
                        'POST',
                        'Carrito.aspx/GetCarrito',
                        JSON.stringify(data),
                        data => {
                            if (data) {
                                localStorage.clear();   //Eliminamos los productos del localStorage
                                renderCarrito([])   //se vuelve a renderizar el carrito
                                document.getElementById('no_carrito').textContent = localStorage.length;    //se restablece la cantidad de elementos en el carrito
                                alert("Ordenado!", "Tu pedido esta pendiente", "info");
                            } else alert("Ocurrio un error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                        },
                        error => {
                            console.error(error);
                            alert("Error", "Algo salio mal.. Intentalo de nuevo m&aacute;s tarde", "danger");
                        }
                    );
                } else $loginModal.show();
            } else if ($btn_del.includes(e.target)) {
                //En el caso de que el evento click se haya hecho en el boton de borrar un elemento
                try {
                    values.forEach(producto => {
                        //Se busca el producto en el arreglo de productos
                        if (producto.variantes_producto.txt_id_variante === e.target.parentNode.dataset.id) {
                            if (!producto.int_carrito) {
                                localStorage.removeItem(producto.llaveLS[0]);   //borramos el producto del localStorage
                                update_carrito(values, producto); //función para actualizar carrito
                            } else {
                                localStorage.removeItem(producto.llaveLS[0]);   //borramos el producto del localStorage
                                if (producto.int_carrito > 1) {
                                    --producto.int_carrito
                                    producto.llaveLS.splice(0, 1); //borramos la llave de un producto
                                    update_carrito(values, producto, false); //función para actualizar carrito
                                } else update_carrito(values, producto); //función para actualizar carrito
                            }
                        }
                    });
                    alert("Eliminado!", "El producto se borró de tu carrito", "success");
                } catch (err) {
                    alert("Error", "El producto no fue eliminado", "danger");
                }
            } else if ($btn_del_All.includes(e.target)) {
                //En el caso de que el evento click se haya hecho en el boton de borrar todos los elementos
                try {
                    values.forEach(producto => {
                        //Se busca el producto en el arreglo de productos
                        if (producto.variantes_producto.txt_id_variante === e.target.parentNode.dataset.id) {
                            producto.llaveLS.forEach(key => localStorage.removeItem(key));  //se borran todos los elementos del localStorage que coincidan con el producto
                            update_carrito(values, producto); //función para actualizar carrito
                        }
                    });
                    alert("Eliminados!", "Los productos fueron borrados de tu carrito", "success");
                } catch (err) {
                    alert("Error", "Los productos no fueron eliminados", "danger");
                }
            }
        });
    } else vacio();
})();