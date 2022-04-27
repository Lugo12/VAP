import { ajax } from './ajax.js';       //importando funcion ajax
(function () {
    const $head = document.querySelector('.head_catalogo'),
        $body = document.querySelector('.body_catalogo'),
        $mensaje = document.querySelector('.mensaje_catalogo');
    //funcion ajax para traer productos a la vista
    ajax(
        'POST',
        'Default.aspx/GetCatalogo',
        null,
        data => data.length === 0 ? falla() : peticionExitosa(data),
        error => {
            console.error(error);
            falla();
        }
    );
    //render de vista en caso de fracaso
    const falla = () => {       
        $head.classList.add('oculto');
        $body.classList.add('oculto');
        $mensaje.classList.remove('oculto');
    };
    //render de vista en caso de exito
    const exito = () => {       
        $head.classList.remove('oculto');
        $body.classList.remove('oculto');
        $mensaje.classList.add('oculto');
    };
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
            $template.querySelector('.text_producto').textContent = producto.txt_concepto_prenda;
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
        let data_actual = data, producto = null, variante = null, talla = null, color = null, talla_actual = null;
        //funcion para cerrar el modal y limpiar las selecciones
        const limpiaModal = () => {
            $modal_carrito.classList.add('disabled');
            $modal_existencias.classList.add('invisible');
            $modal_contenido.querySelector('.blanco').classList.remove('seleccionado');
            $modal_contenido.querySelector('.negro').classList.remove('seleccionado');
            talla = null;
            color = null;
            producto = null;
            variante = null;
            if (talla_actual) {
                talla_actual.classList.remove('label_active');
                talla_actual = null;    //reinicio de la variable que almacena la talla actual seleccionada
            }
        }
        //funcion para mostrar los detalles del producto en el modal
        const detallesModal = e => {
            const $detalles = Array.from(document.querySelectorAll('.detalles_producto'));      //arreglo de los botones de detalles que existen            
            const $imagenes = Array.from($body.getElementsByTagName('img'));      //arreglo de los imagenes de los productos mostrados
            //En caso de que el boton detalles haya lanzado el evento               
            if ($detalles.includes(e.target) || $imagenes.includes(e.target)) {
                producto = data_actual.find(p => p.id_prenda === parseInt(e.target.dataset.id));
                $modal_titulo.textContent = `${producto.txt_tipo_prenda} - ${producto.txt_marca_prenda}`;
                $modal_imagen.src = `${producto.img_negro_prenda}`;
                $modal_precio.textContent = `$MXN${producto.dec_precio_prenda}`;
                $modal_concepto.textContent = producto.txt_concepto_prenda;
            }
        }
        //Efecto al pasar el mouse sobre una imagen
        $body.addEventListener('mouseover', e => {
            const $imagenes = Array.from($body.getElementsByTagName('img'));
            //En caso de que se pase el raton encima de la imagen de cada objeto
            if ($imagenes.includes(e.target)) e.target.parentNode.parentNode.classList.add('efecto_producto')
        });
        //Efecto al retirar el mouse de una imagen
        $body.addEventListener('mouseout', e => {
            const $imagenes = Array.from($body.getElementsByTagName('img'));
            //En caso de que se pase el raton encima de la imagen de cada objeto
            if ($imagenes.includes(e.target)) e.target.parentNode.parentNode.classList.remove('efecto_producto')
        });
        //delegación del evento click en la cabecera del catalogo
        $head.addEventListener('click', e => {      
            const $filtros = Array.from($head.getElementsByTagName('a'));
            //En caso de que los filtros hayan lanzado el evento
            if ($filtros.includes(e.target)) {
                //acciones para cada elemento que haya lanzado el evento
                switch (e.target.id) {
                    case 'flt_Todo':
                        renderCatalogo(data);
                        data_actual = data;
                        break;
                    case 'flt_Sudadera':
                        let sudaderas = data_actual.filter(producto => producto.txt_tipo_prenda === "sudadera");
                        if (sudaderas.length === 0) sudaderas = data.filter(producto => producto.txt_tipo_prenda === "sudadera");
                        renderCatalogo(sudaderas);
                        data_actual = sudaderas;
                        break;
                    case 'flt_Playera':
                        let playeras = data_actual.filter(producto => producto.txt_tipo_prenda === "playera");
                        if (playeras.length === 0) playeras = data.filter(producto => producto.txt_tipo_prenda === "playera");
                        renderCatalogo(playeras);
                        data_actual = playeras;
                        break;
                    case 'ob_Menor':
                        const menores = data_actual.sort((p1, p2) => (p1.dec_precio_prenda > p2.dec_precio_prenda) ? 1 : (p1.dec_precio_prenda < p2.dec_precio_prenda) ? -1 : 0);
                        renderCatalogo(menores);
                        data_actual = menores;
                        break;
                    case 'ob_Mayor':
                        const mayores = data_actual.sort((p1, p2) => (p1.dec_precio_prenda < p2.dec_precio_prenda) ? 1 : (p1.dec_precio_prenda > p2.dec_precio_prenda) ? -1 : 0);
                        renderCatalogo(mayores);
                        data_actual = mayores;
                        break;
                }
            }
        });
        //delegación del evento click para los detalles de los producto
        $body.addEventListener('click', e => detallesModal(e));
        //delegación del evento click para las acciones en el modal
        $modal_contenido.addEventListener('click', e => {      
            const $radios = Array.from($modal_contenido.getElementsByTagName('input'));     //arreglo de los input:radio del modal
            //En caso de que cualquier input del modal haya lanzado el evento
            if ($radios.includes(e.target)) {       
                const ch = $modal_contenido.querySelector('.CH');
                const m = $modal_contenido.querySelector('.M');
                const g = $modal_contenido.querySelector('.G');
                const eg = $modal_contenido.querySelector('.EG');
                //funcion para agregar la clase active a los labels seleccionados y remover al label anterior a este
                const addRmvTalla = (ntalla, otalla) => {
                    ntalla.classList.add('label_active');
                    if (otalla) otalla.classList.remove('label_active');
                    return ntalla;
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
                    //En caso de que no existan variantes del producto o ya no existan unidades
                    if (!variante || variante.int_cantidad_prenda === 0) {
                        $modal_carrito.classList.add('disabled');
                        $modal_existencias.classList.remove('invisible');
                    } else {
                        $modal_carrito.classList.remove('disabled');
                        $modal_existencias.classList.add('invisible');
                    }
                }
            }
        });
        //asignación del evento click para agregar productos al carrito
        $modal_carrito.addEventListener('click', e => {
            try {                
                const carrito = producto;   //creamos una copia del producto que se desea agregar al carrito
                carrito.variantes_producto = variante; 
                const key = `${carrito.variantes_producto.txt_id_variante}${Date.now()}`;  //key para el producto en el LocalStorage
                localStorage.setItem(key, JSON.stringify(carrito));      //enviamos el producto al LocalStorage
                limpiaModal()
            } catch (err) {
                console.log(err);
            }
        });
        //evento de cierre del modal
        $modal.addEventListener('hidden.bs.modal', limpiaModal);
    };
})();
