using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using Newtonsoft.Json;

namespace VAP
{
    public partial class Default : System.Web.UI.Page
    {
        static string json = null, busqueda = null;  
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
                        dbProductos = from d in db.producto
                                      where d.txt_estado_prenda == "vigente"
                                      && d.txt_concepto_prenda.Contains(busqueda)
                                      || d.txt_marca_prenda.Contains(busqueda)
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
        }
        [WebMethod]
        public static string GetCatalogo() {
            Busqueda();
            return json; 
        }     //Envio de la cadena JSON al cliente
        [WebMethod]
        public static bool GetBusqueda(string busqueda)     //Recibe la información de la busqueda
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
        }
    }
}