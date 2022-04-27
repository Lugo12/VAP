//funcion para todas las peticiones ajax al servidor con API fetch
export const ajax = async (method, url, body = null, success, reject) => {
  try {
    let options = {     //atributos de la peticion
        method,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        body
      },
      res = await fetch(url, options),      //peticion
      json = await res.json();      //recuperando data
    //En caso de que haya fallado la conexión se envia al catch
    if (!res.ok) throw { status: res.status, statusText: res.statusText };      //validacion de estado
    success(JSON.parse(json.d));    //funcion en caso de exito
  } catch (err) {
    let message = err.statusText || 'Ocurrió un error';
    console.log(`Error ${err.status}: ${message}`);     //error en consola
    reject(err);        //funcion en caso de fracaso
  }
};
