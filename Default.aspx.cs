using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using Newtonsoft.Json;
using System.Web;

namespace VAP
{
    public partial class Default : System.Web.UI.Page
    {
        static string json = null, busqueda = null;
        //public static string cliente = null;  
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        private static void Busqueda()
        {
            //uso de entity framework
            using (VAP_ProjectEntities db = new VAP_ProjectEntities())
            {
                try
                {
                    //Select de la tabla productos
                    var dbProductos = db.producto.Where(d => d.txt_estado_prenda == "vigente");
                    //Cuando hay una busqueda que filtrar
                    if (busqueda != null)
                    {
                        if (busqueda == "playeras") busqueda = "playera";
                        else if (busqueda == "sudaderas") busqueda = "sudadera";
                        dbProductos = from d in db.producto
                                      where d.txt_estado_prenda == "vigente"
                                      && d.txt_concepto_prenda.Contains(busqueda)
                                      || d.txt_marca_prenda.Contains(busqueda)
                                      || d.txt_tipo_prenda.Contains(busqueda)
                                      || d.dec_precio_prenda.ToString().Contains(busqueda)
                                      select d;
                    }
                    //asignamos lo que nos trajo la base de datos a la variable que enviaremos al servidor
                    json = JsonConvert.SerializeObject(dbProductos.ToList(), Formatting.Indented, new JsonSerializerSettings
                    {
                        PreserveReferencesHandling = PreserveReferencesHandling.Objects
                    });
                }
                catch (Exception evento)
                {
                    json = JsonConvert.SerializeObject(evento, Formatting.Indented);
                }
                busqueda = null;    //reiniciamos la variable de busqueda
            }
        }   //Metodo para buscar la lista de productos
        private static string Registro(string nombre, string apellidos, string telefono, string correo, string password)
        {
            try
            {
                using(VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    var estado = "";
                    if (db.ComprobarPass(correo).ToList().Count > 0) estado = JsonConvert.SerializeObject("correo_existente", Formatting.Indented);
                    else {
                        db.CrearCliente(nombre, apellidos, telefono, correo, password);
                        db.SaveChanges();
                        //cliente = JsonConvert.SerializeObject(db.ComprobarPass(correo).ToList(), Formatting.Indented);
                        estado = JsonConvert.SerializeObject(db.ComprobarPass(correo).ToList(), Formatting.Indented);
                    }
                    return estado;
                }
            }catch(Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }
        //Función para saber si el correo ya fue agregado
        private static string Logueo(string correo, string password)
        {            
            try
            {
                using (VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    var respuesta = db.ComprobarPass(correo).ToList();
                    var estado = "";
                    if (respuesta.Count > 0)
                    {
                        if (respuesta.Contains(respuesta.Find(d => d.Pass == password)))
                        {
                            //cliente = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
                            estado = JsonConvert.SerializeObject(db.ComprobarPass(correo).ToList(), Formatting.Indented);
                        }
                        else estado = JsonConvert.SerializeObject("password_error", Formatting.Indented);
                    }
                    else estado = JsonConvert.SerializeObject("correo_error", Formatting.Indented);
                    return estado;
                }
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }
        //Funciones que solicita el cliente
        [WebMethod]
        public static string GetCatalogo()
        {
            Busqueda();
            return json;
        }       //Envio de la cadena JSON al cliente
        [WebMethod]
        public static bool SetBusqueda(string busqueda)
        {
            try
            {
                Default.busqueda = busqueda;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }       //Recibe la información de la busqueda
        [WebMethod]
        public static string SetCliente(string nombre, string apellidos, string telefono, string correo, string password)
        {
            return Registro(nombre, apellidos, telefono, correo, password);
        }       //Recibe la información del cliente para su registro
        [WebMethod]
        public static string GetCliente(string correo, string password)
        {
            return Logueo(correo, password);
        }       //Recibe la información del cliente para su logueo
        [WebMethod]
        public static string ExistCliente(string correo)
        {
            try
            {
                using (VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    var respuesta = db.ComprobarPass(correo).ToList();
                    if (respuesta.Count > 0)
                    {
                        return JsonConvert.SerializeObject(db.ComprobarPass(correo).ToList(), Formatting.Indented);
                    } else return JsonConvert.SerializeObject("No", Formatting.Indented);
                }
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }   //Comprobamos si existe un cliente logueado
    }
}