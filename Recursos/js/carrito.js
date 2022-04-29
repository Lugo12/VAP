import { ajax } from './ajax.js';       //importando funcion ajax
import { alert } from './alerta.js';       //importando funcion alert
import { visible, invisible } from './vista.js';       //importando funcion de la vista
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
            $body.innerHTML = "";
            const $template = document.getElementById('template_carrito').content,
                $fragment = document.createDocumentFragment();
            //por cada producto existente usamos un template 
            data.forEach(producto => {
                
                let $clone = document.importNode($template, true);  //creamos un clon del template y le asegnamos valores a sus atributos
                $fragment.appendChild($clone);      //agregamos el template a un fragmento
            });
            $body.appendChild($fragment);       //agregamos el fragmento a la vista
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
                        flag = true;    //bandera para saber si se encontro una coincidencia
                    }
                }
                if (!flag) values.push(producto)    //empujamos el elemento en caso de que no se haya encontrado una coincidencia
            } else values.push(producto)    //empujamos al arreglo si es que es el primer producto
        });
        renderCarrito(values);
    } else vacio();
})();