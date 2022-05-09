import { ajax } from './ajax.js';       //importando funcion ajax
import { alert } from './alerta.js';       //importando funcion alert
import { visible, invisible } from './vista.js';       //importando funcion de la vista
import { deepClone } from './deepClone.js';       //importando funcion para clonar objetos profundos
(function () {
    const $head = document.querySelector('.head_catalogo'),
        $body = document.querySelector('.body_catalogo');
    //funcion ajax para traer productos a la vista
    ajax(
        'POST',
        'Default.aspx/GetCatalogo',
        null,
        data => {
            //Validación en caso de excepción en lugar de datos esperados
            if (!data.ClassName) data.length === 0 ? falla() : peticionExitosa(comparaCarrito(data))
            else {
                console.log("Excepcion del lado del servidor:", data);
                falla();
            }
        },
        error => {
            console.error(error);
            falla();
        }
    );
    //funcion para comparar la información de la base de datos con la del carrito
    const comparaCarrito = data => {
        //si el localStorage es igual a 0 omitimos esta funcion, si no entramos a su funcionamiento
        if (localStorage.length > 0) {
            const keys = [];    //arreglo de todas las llaves que hay en el localStorage
            for (let key = 0; key < localStorage.length; key++) keys.push(localStorage.key(key));
            data.forEach(producto => {
                producto.variantes_producto.forEach(variante => {
                    keys.forEach(key => {
                        const valor = JSON.parse(localStorage.getItem(key));    //valor del item en el localStorage donde la llave es igual a key
                        //si las id de los productos que hay en el localStorage y la BD coincide entra
                        if (variante.txt_id_variante === valor.variantes_producto.txt_id_variante) {
                            --variante.int_cantidad_prenda; //se disminuye una unidad
                        }
                    })
                })
            })
            return data;
        } else return data;
    }
    //render de vista en caso de fracaso
    const falla = () => invisible($head, $body,"Parece que no hay productos por el momento");
    //render de vista en caso de exito
    const exito = () => visible($head, $body);
    //render de productos en pantalla
    const renderCatalogo = data => {        
        $body.innerHTML = "";       //reinicio de la vista
        const $template = document.getElementById('template_catalogo').content,
            $fragment = document.createDocumentFragment();
        //por cada producto existente usamos un template 
        data.forEach(producto => {      
            $template.querySelector('.header_producto').textContent = `${producto.txt_tipo_prenda} - ${producto.txt_marca_prenda}`;
            $template.querySelector('.image_producto').childNodes[1].src = `${producto.img_negro_prenda}`;
            $template.querySelector('.image_producto').childNodes[1].dataset.id = producto.id_prenda;
            $template.querySelector('.title_producto').textContent = `$MXN${producto.dec_precio_prenda}`;
            $template.querySelector('.detalles_producto').dataset.id = producto.id_prenda;
            let $clone = document.importNode($template, true);  //creamos un clon del template y le asegnamos valores a sus atributos
            $fragment.appendChild($clone);      //agregamos el template a un fragmento
        });
        $body.appendChild($fragment);       //agregamos el fragmento a la vista
    }
    //funcion que se ejecuta despues de que la peticion ajax haya sido un exito
    const peticionExitosa = data => {
        exito();
        renderCatalogo(data);
        const $modal = document.getElementById('modal_detalles'),
            $modal_titulo = document.getElementById('titulo_modal_detalles'),
            $modal_imagen = document.getElementById('imagen_modal'),
            $modal_precio = document.getElementById('precio_modal'),
            $modal_concepto = document.getElementById('concepto_modal'),
            $modal_contenido = document.querySelector('.contenido_modal'),
            $modal_existencias = document.getElementById('modal_existencias'),
            $modal_carrito = document.getElementById('agregar_carrito');
        let data_actual = data.slice(),
            producto = null,
            variante = null,
            talla = null,
            color = null,
            talla_actual = null;
        //funcion para cerrar el modal y limpiar las selecciones
        const limpiaModal = () => {
            $modal_carrito.classList.add('disabled');
            $modal_existencias.classList.add('invisible');
            $modal_contenido.querySelector('.blanco').classList.remove('seleccionado');
            $modal_contenido.querySelector('.negro').classList.remove('seleccionado');
            $modal_existencias.textContent = "";
            $modal_existencias.classList.add('invisible');
            talla = null;
            color = null;
            producto = null;
            variante = null;
            if (talla_actual) {
                talla_actual.classList.remove('label_active');
                talla_actual = null;    //reinicio de la variable que almacena la talla actual seleccionada
            }
        }
        //Delegación del evento al pasar el mouse sobre una imagen
        document.addEventListener('mouseover', e => {
            const $imagenes = Array.from($body.getElementsByTagName('img'));
            //En caso de que se pase el raton encima de la imagen de cada objeto
            if ($imagenes.includes(e.target)) e.target.parentNode.parentNode.classList.add('efecto_producto')
        });
        //Delegación del evento al retirar el mouse de una imagen
        document.addEventListener('mouseout', e => {
            const $imagenes = Array.from($body.getElementsByTagName('img'));
            //En caso de que se pase el raton encima de la imagen de cada objeto
            if ($imagenes.includes(e.target)) e.target.parentNode.parentNode.classList.remove('efecto_producto')
        });
        //delegación del evento click en el catagolo
        document.addEventListener('click', e => {
            const $filtros = Array.from($head.getElementsByTagName('a'));       //arreglo de los filtros
            const $detalles = Array.from(document.querySelectorAll('.detalles_producto'));      //arreglo de los botones de detalles que existen            
            const $imagenes = Array.from($body.getElementsByTagName('img'));      //arreglo de los imagenes de los productos mostrados
            const $radios = Array.from($modal_contenido.getElementsByTagName('input'));     //arreglo de los input:radio del modal
            //En caso de que los filtros hayan lanzado el evento
            if ($filtros.includes(e.target)) {
                //acciones para cada elemento que haya lanzado el evento
                switch (e.target.id) {
                    case 'flt_Todo':
                        data_actual = data.slice();
                        break;
                    case 'flt_Sudadera':
                        let sudaderas = data_actual.filter(producto => producto.txt_tipo_prenda === "sudadera");
                        if (sudaderas.length === 0) sudaderas = data.filter(producto => producto.txt_tipo_prenda === "sudadera");
                        data_actual = sudaderas.slice();
                        break;
                    case 'flt_Playera':
                        let playeras = data_actual.filter(producto => producto.txt_tipo_prenda === "playera");
                        if (playeras.length === 0) playeras = data.filter(producto => producto.txt_tipo_prenda === "playera");
                        data_actual = playeras.slice();
                        break;
                    case 'ob_Menor':
                        const menores = data_actual.sort((p1, p2) => (p1.dec_precio_prenda > p2.dec_precio_prenda) ? 1 : (p1.dec_precio_prenda < p2.dec_precio_prenda) ? -1 : 0);
                        data_actual = menores.slice();
                        break;
                    case 'ob_Mayor':
                        const mayores = data_actual.sort((p1, p2) => (p1.dec_precio_prenda < p2.dec_precio_prenda) ? 1 : (p1.dec_precio_prenda > p2.dec_precio_prenda) ? -1 : 0);
                        data_actual = mayores.slice();
                        break;
                }
                renderCatalogo(data_actual);
            } else if ($detalles.includes(e.target) || $imagenes.includes(e.target)) {
                //En caso de que el boton detalles haya lanzado el evento
                producto = data_actual.find(p => p.id_prenda === parseInt(e.target.dataset.id));
                $modal_titulo.textContent = `${producto.txt_tipo_prenda} - ${producto.txt_marca_prenda}`;
                $modal_imagen.src = `${producto.img_negro_prenda}`;
                $modal_precio.textContent = `$MXN${producto.dec_precio_prenda}`;
                $modal_concepto.textContent = producto.txt_concepto_prenda;
            } else if ($radios.includes(e.target)) {
                //En caso de que cualquier input del modal haya lanzado el evento
                const ch = $modal_contenido.querySelector('.CH');
                const m = $modal_contenido.querySelector('.M');
                const g = $modal_contenido.querySelector('.G');
                const eg = $modal_contenido.querySelector('.EG');
                //funcion para agregar la clase active a los labels seleccionados y remover al label anterior a este
                const addRmvTalla = (ntalla, otalla) => {
                    if (ntalla !== otalla) {
                        ntalla.classList.add('label_active');
                        if (otalla) otalla.classList.remove('label_active');
                        return ntalla;
                    } else return ntalla;
                };
                //acciones para cada elemento que haya lanzado el evento
                switch (e.target.id) {
                    case 'btnradioCH':
                        talla = 'CH';
                        talla_actual = addRmvTalla(ch, talla_actual);
                        break;
                    case 'btnradioM':
                        talla = 'M';
                        talla_actual = addRmvTalla(m, talla_actual);
                        break;
                    case 'btnradioG':
                        talla = 'G';
                        talla_actual = addRmvTalla(g, talla_actual);
                        break;
                    case 'btnradioEG':
                        talla = 'EG';
                        talla_actual = addRmvTalla(eg, talla_actual);
                        break;
                    case 'btnradioN':
                        color = 'negro';
                        $modal_contenido.querySelector('.negro').classList.add('seleccionado');
                        $modal_contenido.querySelector('.blanco').classList.remove('seleccionado');
                        $modal_imagen.src = `${producto.img_negro_prenda}`;
                        break;
                    case 'btnradioB':
                        color = 'blanco';
                        $modal_contenido.querySelector('.blanco').classList.add('seleccionado');
                        $modal_contenido.querySelector('.negro').classList.remove('seleccionado');
                        $modal_imagen.src = `${producto.img_blanco_prenda}`;
                        break;
                }
                //En caso de que se haya seleccionado una talla y un color
                if (talla && color) {
                    variante = producto.variantes_producto.find(v => v.txt_color_prenda === color && v.txt_talla_prenda === talla);
                    //En caso de que no existan variantes del producto
                    if (!variante || variante.int_cantidad_prenda === 0) {
                        $modal_carrito.classList.add('disabled');
                        $modal_existencias.classList.remove('invisible');
                        $modal_existencias.textContent = "Sin Existencias";
                    } else {
                        $modal_carrito.classList.remove('disabled');
                        $modal_existencias.classList.remove('invisible');
                        $modal_existencias.textContent = `Existencias: ${variante.int_cantidad_prenda}`;

                    }
                }
            } else if (e.target == $modal_carrito) {
                //En caso de que el botón de agregar al carrito haya lanzado el evento
                try {
                    //validación en caso de que se acceda al boton por otro metodo
                    if (variante && variante.int_cantidad_prenda > 0) {
                        const carrito = deepClone(producto);   //creamos una copia del producto que se desea agregar al carrito
                        carrito.variantes_producto = deepClone(variante);
                        const key = `${carrito.variantes_producto.txt_id_variante}${Date.now()}`;  //key para el producto en el LocalStorage
                        localStorage.setItem(key, JSON.stringify(carrito));      //enviamos el producto al LocalStorage
                        --variante.int_cantidad_prenda; //disminuimos una unidad manualmente de la data actual del lado del cliente
                        limpiaModal();
                        alert("Lo tienes!", `Tu producto se agrego al carrito con &eacute;xito`, "info");
                        document.getElementById('no_carrito').textContent = localStorage.length;    //se restablece la cantidad de elementos en el carrito
                    } else throw 666
                } catch (err) {
                    if (err === 666) {
                        //Alerta en caso de que se haya intentado agregar productos al carrito por un metodo indebido
                        alert("FBI", "We are coming for you...", "danger");
                        console.log(err);
                    } else {
                        //Alerta en caso de que haya un error al agregar productos al carrito
                        alert("Algo salio mal...", `Tu producto no pudo ser agregado al carrito, intentalo m&aacute;s tarde`, "danger");
                        console.log(err);
                    }
                }
            }
        });        
        //evento de cierre del modal
        $modal.addEventListener('hidden.bs.modal', limpiaModal);
    };
})();
