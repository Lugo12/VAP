//funcion para clonar objetos profundos 
export const deepClone = objeto => {
    const clon = {};    //clon vacio
    //por cada llave de las propiedades en el objeto
    for (let key in objeto) {
        let valor = objeto[key];    //traemos el valor de las propiedades del objeto
        if (typeof (valor) !== 'object') clon[key] = valor;     //si el valor es diferente a un objeto lo agregamos al clon
        else clon[key] = deepClone(valor);  //si es un objeto usamos la recursividad pra clonar el objeto
    }
    return clon;    //retornamos el clon
}
//No es util con funciones