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
        cargado();
        //función para pintar los productos en el carrito
        const renderCarrito = (data) => {
            if (data.length > 0) {
                $body.innerHTML = "";
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
                $body.appendChild($fragment);       //agregamos el fragmento a la vista
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
        tooltip(); //funcion para activar los tooltip
        //delegacion del evento click en el carrito
        $body.addEventListener('click', e => {
            const $btn_del = Array.from($body.querySelectorAll('.del'));
            const $btn_del_All = Array.from($body.querySelectorAll('.del_All'));
            const update_carrito = (values, producto, eliminado = true) => {
                if (eliminado) values.splice(values.indexOf(producto), 1); //se borra el producto del arreglo                
                renderCarrito(values)   //se vuelve a renderizar el carrito
                tooltip();  //cargamos los tooltip nuevamente
                document.querySelector('.tooltip').remove();    //correción para un bug con los tooltip
                document.getElementById('no_carrito').textContent = localStorage.length;    //se restablece la cantidad de elementos en el carrito
            }
            //En el caso de que el evento click se haya hecho en el boton de borrar un elemento
            if ($btn_del.includes(e.target)) {
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
            //En el caso de que el evento click se haya hecho en el boton de borrar todos los elementos
            } else if ($btn_del_All.includes(e.target)) {   
                values.forEach(producto => {
                    //Se busca el producto en el arreglo de productos
                    if (producto.variantes_producto.txt_id_variante === e.target.parentNode.dataset.id) {
                        producto.llaveLS.forEach(key => localStorage.removeItem(key));  //se borran todos los elementos del localStorage que coincidan con el producto
                        update_carrito(values, producto); //función para actualizar carrito
                    }
                });
            }
        })
    } else vacio();
})();